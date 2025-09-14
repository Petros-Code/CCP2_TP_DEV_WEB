import express from "express";
import pool from "../core/config.js"
import UserRepository from "../modules/utilisateurs/utilisateurs.repository.js";
import UserController from "../modules/utilisateurs/utilisateurs.controller.js";

const router = express.Router();
const userRepository = new UserRepository(pool);
const userController = new UserController(userRepository);
import validateMiddleware from "../middlewares/validate.js";
import { registerSchema, loginSchema, updateSchema } from "../validators/utilisateurs.joi.js";

/**
 * @swagger
 * /utilisateurs/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *           example:
 *             nom: "Jean Dupont"
 *             email: "jean.dupont@example.com"
 *             mot_de_passe: "motdepasse123"
 *             role: "BENEVOLE"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *             example:
 *               message: "Utilisateur créé avec succès"
 *               user:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 nom: "Jean Dupont"
 *                 email: "jean.dupont@example.com"
 *                 role: "BENEVOLE"
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Erreur de validation"
 *               details: ["Le nom est requis", "L'email doit être valide"]
 */
router.post("/register", validateMiddleware(registerSchema), (req, res, next) => userController.register(req, res, next));

/**
 * @swagger
 * /utilisateurs/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: "jean.dupont@example.com"
 *             mot_de_passe: "motdepasse123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         headers:
 *           Set-Cookie:
 *             description: Cookie JWT sécurisé
 *             schema:
 *               type: string
 *               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     email:
 *                       type: string
 *                       example: "jean.dupont@example.com"
 *       401:
 *         description: Identifiants incorrects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Non autorisé"
 *               details: "Identifiants incorrects"
 */
router.post("/login", validateMiddleware(loginSchema), (req, res, next) => userController.login(req, res, next));

/**
 * @swagger
 * /utilisateurs/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Déconnecté avec succès"
 */
router.post("/logout", validateMiddleware(updateSchema), (req, res, next) => userController.logout(req, res, next));

export default router