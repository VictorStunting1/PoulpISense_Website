const express = require("express");
const cors = require("cors");
const axios = require("axios");
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


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Ici on fait une vérif simple ou appel vers l’API si elle gère le login
  if (email === "admin@iot.com" && password === "1234") {
    res.json({ token: "faketoken" });
  } else {
    res.status(401).json({ message: "Identifiants incorrects" });
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
