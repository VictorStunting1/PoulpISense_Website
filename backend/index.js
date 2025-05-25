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
const BASE_API_URL = "http://ssssirhcwan.ddns.net:40000";



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
    const response = await axios.get(`${BASE_API_URL}/users`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
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

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
