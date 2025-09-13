import { Router } from "express";
import MissionRepository from "../modules/missions/missions.repository.js";
import MissionController from "../modules/missions/missions.controller.js";
import pool from "../core/config.js";

const router = Router();
const missionRepository = new MissionRepository(pool);
const missionController = new MissionController(missionRepository);

import authMiddleware from "../middlewares/auth.js";
import checkRole from "../middlewares/role.js";

// --- Routes "publiques" ---
router.get("/", (req, res) => missionController.getAllMissions(req, res));

// --- Routes à protéger ---
router.post("/create", authMiddleware, checkRole(["ASSOCIATION"]), (req, res) => missionController.createMission(req, res));
router.patch("/:id", authMiddleware, checkRole(["ASSOCIATION"]), (req, res) => missionController.updateMission(req, res));
router.delete("/:id", authMiddleware, checkRole(["ASSOCIATION"]), (req, res) => missionController.deleteMission(req, res));

export default router;
