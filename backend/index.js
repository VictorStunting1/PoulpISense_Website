const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Configuration des URLs d'API
// Changez MODE_PRODUCTION à false pour utiliser le serveur local
const MODE_PRODUCTION = true; // Set to true for production

const BASE_API_URL = MODE_PRODUCTION 
  ? "http://ssssirhcwan.ddns.net:40000"
  : "http://localhost:3001";

axios.defaults.headers.common['XApiKey'] = 'pgH7QzFHJx4w46fI~5Uzi4RvtTwLEXp';

app.get("/", (req, res) => {
  res.send("Backend opérationnel !");
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/users`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur complète Axios:', error);
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data);
    } else {
      console.error('Axios error:', error.message);
    }
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.post("/api/users_password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.get(`${BASE_API_URL}/users`);
    const users = response.data.$values || response.data;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    let hash = user.password;
    hash = hash.replace(/^\$2y\$/, '$2a$');

    const match = await bcrypt.compare(password, hash);

    if (!match) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    res.json({ token: "faketoken", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

app.get("/api/devices", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/devices`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur API" });
  }
});

// GET /api/alerts - récupère toutes les alertes
app.get("/api/alerts", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/alerts`);
    // Gérer le format $values de l'API .NET
    const alerts = response.data.$values || response.data;
    console.log('Alertes récupérées depuis l\'API:', alerts.length);
    res.json(alerts);
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des alertes" });
  }
});

// Fonction utilitaire pour résoudre les références circulaires de .NET
function resolveCircularReferences(data, idMap = new Map()) {
  if (data === null || data === undefined) return data;
  
  if (typeof data === 'object') {
    // Si c'est une référence, la résoudre
    if (data.$ref) {
      return idMap.get(data.$ref) || data;
    }
    
    // Si l'objet a un $id, l'ajouter à la map
    if (data.$id) {
      idMap.set(data.$id, data);
    }
    
    // Résoudre récursivement les propriétés
    if (Array.isArray(data)) {
      return data.map(item => resolveCircularReferences(item, idMap));
    } else {
      const resolved = {};
      for (const [key, value] of Object.entries(data)) {
        if (key !== '$id') { // Exclure les métadonnées
          resolved[key] = resolveCircularReferences(value, idMap);
        }
      }
      return resolved;
    }
  }
  
  return data;
}

// Fonction pour extraire toutes les mesures d'une réponse avec références circulaires
function extractAllMeasurements(data) {
  const resolved = resolveCircularReferences(data);
  const measurements = [];
  
  function collectMeasurements(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    // Si c'est une mesure (a un id, deviceId, timestamp)
    if (obj.id !== undefined && obj.deviceId !== undefined && obj.timestamp) {
      measurements.push({
        id: obj.id,
        deviceId: obj.deviceId,
        timestamp: obj.timestamp,
        temperature: obj.temperature,
        ph: obj.ph,
        turbidity: obj.turbidity
      });
    }
    
    // Parcourir récursivement les propriétés
    if (Array.isArray(obj)) {
      obj.forEach(collectMeasurements);
    } else {
      Object.values(obj).forEach(collectMeasurements);
    }
  }
  
  collectMeasurements(resolved);
  
  // Supprimer les doublons par ID
  const uniqueMeasurements = measurements.filter((measurement, index, self) =>
    index === self.findIndex(m => m.id === measurement.id)
  );
  
  return uniqueMeasurements;
}

// GET /api/measurements - récupère toutes les mesures
app.get("/api/measurements", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/measurements`);
    
    // Extraire toutes les mesures en résolvant les références circulaires
    const measurements = extractAllMeasurements(response.data);
    
    console.log('Mesures récupérées et résolues:', measurements.length);
    console.log('IDs des mesures:', measurements.map(m => m.id).sort((a, b) => a - b));
    
    res.json(measurements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mesures:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des mesures" });
  }
});

app.get("/api/measurements/device/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const response = await axios.get(`${BASE_API_URL}/measurements/device/${deviceId}`);
    
    // Extraire toutes les mesures en résolvant les références circulaires
    const measurements = extractAllMeasurements(response.data);
    
    console.log(`Mesures récupérées pour l'appareil ${deviceId}:`, measurements.length);
    res.json(measurements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mesures de l'appareil:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des mesures de l'appareil" });
  }
});

app.get("/api/devices/user/:email", async (req, res) => {
  try {
    const usersResponse = await axios.get(`${BASE_API_URL}/users`);
    const users = usersResponse.data.$values || usersResponse.data;
    
    const userEmail = req.params.email;
    const user = users.find(u => u.email === userEmail);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    const userDevicesResponse = await axios.get(`${BASE_API_URL}/devices/user/${user.id}`);
    const userDevices = userDevicesResponse.data.$values || userDevicesResponse.data;
    
    res.json(userDevices);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des appareils utilisateur" });
  }
});

// === ENDPOINTS POUR LES SEUILS D'ALERTES ===

// GET /api/alert-thresholds/user/:userId - récupère tous les seuils d'un utilisateur
app.get("/api/alert-thresholds/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axios.get(`${BASE_API_URL}/alert-thresholds/user/${userId}`);
    const thresholds = response.data.$values || response.data;
    res.json(thresholds);
  } catch (error) {
    console.error("Erreur lors de la récupération des seuils d'alerte:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des seuils d'alerte" });
  }
});

// GET /api/alert-thresholds/device/:deviceId/user/:userId - récupère les seuils d'un appareil pour un utilisateur
app.get("/api/alert-thresholds/device/:deviceId/user/:userId", async (req, res) => {
  try {
    const { deviceId, userId } = req.params;
    const response = await axios.get(`${BASE_API_URL}/alert-thresholds/device/${deviceId}/user/${userId}`);
    const thresholds = response.data.$values || response.data;
    res.json(thresholds);
  } catch (error) {
    console.error("Erreur lors de la récupération des seuils d'alerte de l'appareil:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des seuils d'alerte de l'appareil" });
  }
});

// POST /api/alert-thresholds - crée un nouveau seuil d'alerte
app.post("/api/alert-thresholds", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/alert-thresholds`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la création du seuil d'alerte:", error);
    res.status(500).json({ message: "Erreur lors de la création du seuil d'alerte" });
  }
});

// PUT /api/alert-thresholds/:id - met à jour un seuil d'alerte
app.put("/api/alert-thresholds/:id", async (req, res) => {
  try {
    const thresholdId = req.params.id;
    const response = await axios.put(`${BASE_API_URL}/alert-thresholds/${thresholdId}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du seuil d'alerte:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du seuil d'alerte" });
  }
});

// DELETE /api/alert-thresholds/:id - supprime un seuil d'alerte
app.delete("/api/alert-thresholds/:id", async (req, res) => {
  try {
    const thresholdId = req.params.id;
    const response = await axios.delete(`${BASE_API_URL}/alert-thresholds/${thresholdId}`);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la suppression du seuil d'alerte:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du seuil d'alerte" });
  }
});

// PATCH /api/alert-thresholds/:id/toggle - active/désactive un seuil d'alerte
app.patch("/api/alert-thresholds/:id/toggle", async (req, res) => {
  try {
    const thresholdId = req.params.id;
    const response = await axios.patch(`${BASE_API_URL}/alert-thresholds/${thresholdId}/toggle`);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors du basculement du seuil d'alerte:", error);
    res.status(500).json({ message: "Erreur lors du basculement du seuil d'alerte" });
  }
});

// === ENDPOINTS POUR LES ALERTES ===

// GET /api/alerts - récupère toutes les alertes
app.get("/api/alerts", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/alerts`);
    // Gérer le format $values de l'API .NET
    const alerts = response.data.$values || response.data;
    console.log('Alertes récupérées depuis l\'API:', alerts.length);
    res.json(alerts);
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des alertes" });
  }
});

// GET /api/alerts/device/:deviceId - récupère les alertes d'un appareil
app.get("/api/alerts/device/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const response = await axios.get(`${BASE_API_URL}/alerts/device/${deviceId}`);
    const alerts = response.data.$values || response.data;
    res.json(alerts);
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes de l'appareil:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des alertes de l'appareil" });
  }
});

// PUT /api/alerts/:id/mark-read - marque une alerte comme lue
app.put("/api/alerts/:id/mark-read", async (req, res) => {
  try {
    const alertId = req.params.id;
    const response = await axios.put(`${BASE_API_URL}/alerts/${alertId}/mark-read`);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors du marquage de l'alerte:", error);
    res.status(500).json({ message: "Erreur lors du marquage de l'alerte" });
  }
});

// PUT /api/alerts/:id/mark-unread - marque une alerte comme non lue
app.put("/api/alerts/:id/mark-unread", async (req, res) => {
  try {
    const alertId = req.params.id;
    const response = await axios.put(`${BASE_API_URL}/alerts/${alertId}/mark-unread`);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors du marquage de l'alerte:", error);
    res.status(500).json({ message: "Erreur lors du marquage de l'alerte" });
  }
});

// GET /api/users/by-email/:email - récupère un utilisateur par email
app.get("/api/users/by-email/:email", async (req, res) => {
  try {
    const usersResponse = await axios.get(`${BASE_API_URL}/users`);
    const users = usersResponse.data.$values || usersResponse.data;
    
    const userEmail = req.params.email;
    const user = users.find(u => u.email === userEmail);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  const serverUrl = MODE_PRODUCTION 
    ? `http://ssssirhcwan.ddns.net:${PORT}`
    : `http://localhost:${PORT}`;
  console.log(`Backend running on ${serverUrl}`);
});