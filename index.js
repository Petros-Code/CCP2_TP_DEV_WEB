import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pool from "./core/config.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/utilisateurs.routes.js";
import missionRoutes from "./routes/missions.routes.js";
import candidatureRoutes from "./routes/candidatures.routes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;


//Middlewares globaux
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/users", userRoutes);
app.use("/missions", missionRoutes);
app.use("/candidatures", candidatureRoutes);

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

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Le serveur tourne sur : http://localhost:${port}`);
  });