const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Remplacer par l’URL de ton Swagger si besoin
// const BASE_API_URL = "http://ssssirhcwan.ddns.net:40000";

const BASE_API_URL = "http://10.58.255.68:5168";

axios.defaults.headers.common['XApiKey'] = 'pgH7QzFHJx4w46fI~5Uzi4RvtTwLEXp';



app.get("/", (req, res) => {
  res.send("Backend opérationnel !");
});


/*
app.post("/api/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Récupère tous les utilisateurs depuis l’API distante
    const response = await axios.get(`${BASE_API_URL}/users`);
    const users = response.data;

    // Cherche l’utilisateur avec l’email fourni
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Compare le mot de passe fourni avec le hash stocké
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Authentification réussie
    res.json({ token: "faketoken", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});
*/



app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/users`, axiosConfig);
    res.json(response.data);
  } catch (error) {
    // Log complet de l'erreur pour debug
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
    //const users = response.data;
    const users = response.data.$values || response.data;

    console.log('users:', JSON.stringify(users, null, 2));

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    let hash = user.password;
    hash = hash.replace(/^\$2y\$/, '$2a$');

    // Ajoute ces logs :
    console.log('Mot de passe reçu:', password);
    console.log('Hash utilisé:', hash);

    const match = await bcrypt.compare(password, hash);
    console.log('Résultat bcrypt:', match);

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

app.get("/api/measurements", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/measurements`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur API" });
  }
});


// Récupérer les appareils d'un utilisateur par email
app.get("/api/devices/user/:email", async (req, res) => {
  try {
    // D'abord, récupérer l'ID de l'utilisateur à partir de son email
    const usersResponse = await axios.get(`${BASE_API_URL}/users`);
    const users = usersResponse.data.$values || usersResponse.data;
    
    const userEmail = req.params.email;
    console.log("Email recherché:", userEmail);
    
    const user = users.find(u => u.email === userEmail);
    
    if (!user) {
      console.log("Utilisateur non trouvé avec l'email:", userEmail);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    console.log("Utilisateur trouvé, ID:", user.id);
    
    // Utiliser l'endpoint /devices/user/{userId} pour récupérer les appareils de l'utilisateur
    const userDevicesResponse = await axios.get(`${BASE_API_URL}/devices/user/${user.id}`);
    const userDevices = userDevicesResponse.data.$values || userDevicesResponse.data;
    
    console.log("Appareils trouvés pour l'utilisateur:", userDevices.length);
    
    res.json(userDevices);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des appareils utilisateur" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
