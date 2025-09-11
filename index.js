import express from "express";
import pool from "./core/config.js";
import dotenv from "dotenv";

import userRoute from "./routes/utilisateurs.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


//Middlewares globaux
app.use(express.json());

//Routes
app.use("/users", userRoute);

//HealthCheck & Co
app.get("/bienvenue", (req, res) => {
    res.json({ message: "Bienvenue sur le serveur de PortalAsso" });
  });

  app.get("/etat", async (req, res) => {
    try {
      await pool.query("SELECT 1");
      res.status(200).json({ status: "OK", message: "Connecté à la DB" });
    } catch (error) {
      console.error("Erreur de connexion avec la DB :", error.message);
      res
        .status(500)
        .json({ status: "ERREUR", message: "Erreur de connexion avec la DB" });
    }
  });

  //errorHandler

  app.listen(port, () => {
    console.log(`Le serveur tourne sur : http://localhost:${port}`);
  });