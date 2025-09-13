import { Router } from "express";
import CandidatureRepository from "../modules/candidatures/candidatures.repository.js";
import CandidatureController from "../modules/candidatures/candidatures.controller.js";
import pool from "../core/config.js";

const router = Router();
const candidatureRepository = new CandidatureRepository(pool);
const candidatureController = new CandidatureController(candidatureRepository);

import authMiddleware from "../middlewares/auth.js";
import checkRole from "../middlewares/role.js";
import validateMiddleware from "../middlewares/validate.js";
import candidatureSchema from "../validators/candidatures.joi.js";

// --- Routes "rôle = BENEVOLE" ---
router.post("/apply", authMiddleware, checkRole(["BENEVOLE"]), validateMiddleware(candidatureSchema), (req, res, next) => candidatureController.apply(req, res, next));

// --- Routes "rôle = ASSOCIATION" ---
router.patch("/:id/accept", authMiddleware, checkRole(["ASSOCIATION"]), (req, res, next) => candidatureController.acceptApply(req, res, next));
router.patch("/:id/reject", authMiddleware, checkRole(["ASSOCIATION"]), (req, res, next) => candidatureController.rejectApply(req, res, next));
router.get("/association/:id", authMiddleware, checkRole(["ASSOCIATION"]), (req, res, next) => candidatureController.getAllApplies(req, res, next));

export default router;
