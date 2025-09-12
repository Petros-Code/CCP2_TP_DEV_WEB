import { Router } from "express";
import CandidatureRepository from "../modules/candidatures/candidatures.repository.js";
import CandidatureController from "../modules/candidatures/candidatures.controller.js";
import pool from "../core/config.js";

const router = Router();
const candidatureRepository = new CandidatureRepository(pool);
const candidatureController = new CandidatureController(candidatureRepository);

// --- Routes "rôle = BENEVOLE" ---
router.post("/apply", (req, res) => candidatureController.apply(req, res));

// --- Routes "rôle = ASSOCIATION" ---


export default router;
