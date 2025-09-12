import { Router } from "express";
import MissionRepository from "../modules/missions/missions.repository.js";
import MissionController from "../modules/missions/missions.controller.js";
import pool from "../core/config.js";

const router = Router();
const missionRepository = new MissionRepository(pool);
const missionController = new MissionController(missionRepository);

// --- Routes à protéger ---
router.post("/create", (req, res) => missionController.createMission(req, res));
router.patch("/:id", (req, res) => missionController.updateMission(req, res));

export default router;
