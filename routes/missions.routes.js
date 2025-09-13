import { Router } from "express";
import MissionRepository from "../modules/missions/missions.repository.js";
import MissionController from "../modules/missions/missions.controller.js";
import pool from "../core/config.js";

const router = Router();
const missionRepository = new MissionRepository(pool);
const missionController = new MissionController(missionRepository);

import authMiddleware from "../middlewares/auth.js";
import checkRole from "../middlewares/role.js";
import validateMiddleware from "../middlewares/validate.js";
import { missionSchema, missionUpdateSchema } from "../validators/missions.joi.js";

// --- Routes "publiques" ---
router.get("/", (req, res, next) => missionController.getAllMissions(req, res, next));

// --- Routes à protéger ---
router.post("/create", authMiddleware, checkRole(["ASSOCIATION"]), validateMiddleware(missionSchema), (req, res, next) => missionController.createMission(req, res, next));
router.patch("/:id", authMiddleware, checkRole(["ASSOCIATION"]), validateMiddleware(missionUpdateSchema), (req, res, next) => missionController.updateMission(req, res, next));
router.delete("/:id", authMiddleware, checkRole(["ASSOCIATION"]), (req, res, next) => missionController.deleteMission(req, res, next));

export default router;
