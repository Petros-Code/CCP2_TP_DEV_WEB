import express from "express";
import pool from "../core/config.js"
import UserRepository from "../modules/utilisateurs/utilisateurs.repository.js";
import UserController from "../modules/utilisateurs/utilisateurs.controller.js";

const router = express.Router();
const userRepository = new UserRepository(pool);
const userController = new UserController(userRepository);

// --- Routes publiques ---
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/logout", (req, res) => userController.logout(req, res));



// --- Routes protégées --- Associations uniquement






export default router