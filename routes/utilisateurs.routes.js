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
router.post("/register", validateMiddleware(registerSchema), (req, res, next) => userController.register(req, res, next));
router.post("/login", validateMiddleware(loginSchema), (req, res, next) => userController.login(req, res, next));
router.post("/logout", validateMiddleware(updateSchema), (req, res, next) => userController.logout(req, res, next));

export default router