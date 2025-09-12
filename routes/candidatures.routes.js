import { Router } from "express";
import CandidatureRepository from "../modules/candidatures/candidatures.repository.js";
import CandidatureController from "../modules/candidatures/candidatures.controller.js";
import pool from "../core/config.js";

const router = Router();
const candidatureRepository = new CandidatureRepository(pool);
const candidatureController = new CandidatureController(candidatureRepository);

import authMiddleware from "../middlewares/auth.js";

// --- Routes "rôle = BENEVOLE" ---
router.post("/apply", authMiddleware, (req, res) => candidatureController.apply(req, res));

// --- Routes "rôle = ASSOCIATION" ---
router.patch("/:id/accept", authMiddleware, (req, res) => candidatureController.acceptApply(req, res));
router.patch("/:id/reject", authMiddleware, (req, res) => candidatureController.rejectApply(req, res));
router.get("/association/:id", authMiddleware, (req, res) => candidatureController.getAllApplies(req, res));

export default router;
