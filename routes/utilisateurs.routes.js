import express from "express";
import pool from "../core/config.js"
import UserRepository from "../modules/utilisateurs/utilisateurs.repository.js";
import UserController from "../modules/utilisateurs/utilisateurs.controller.js";

const router = express.Router();
const userRepository = new UserRepository(pool);
const userController = new UserController(userRepository);
import validateMiddleware from "../middlewares/validate.js";
import { registerSchema, loginSchema, updateSchema } from "../validators/utilisateurs.joi.js";

// --- Routes publiques ---
router.post("/register", validateMiddleware(registerSchema), (req, res) => userController.register(req, res));
router.post("/login", validateMiddleware(loginSchema), (req, res) => userController.login(req, res));
router.post("/logout", validateMiddleware(updateSchema), (req, res) => userController.logout(req, res));

export default router