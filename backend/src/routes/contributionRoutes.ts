import { Router } from "express";
import {
  createContribution,
  getContributions,
} from "../controllers/contributionController.js";

const router = Router();

/* POST /api/contributions - Create a new contribution entry */
router.post("/", createContribution);

/* GET /api/contributions - Get all contributions */
router.get("/", getContributions);

export default router;
