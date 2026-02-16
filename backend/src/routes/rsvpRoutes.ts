import { Router } from "express";
import {
  createRsvp,
  getRsvps,
  getRsvpsAdmin,
  getRsvpById,
} from "../controllers/rsvpController.js";

const router = Router();

/* POST /api/rsvp - Create a new RSVP entry */
router.post("/", createRsvp);

/* GET /api/rsvp - Get all RSVPs (public, names only) */
router.get("/", getRsvps);

/* GET /api/rsvp/admin - Get all RSVPs with full details */
router.get("/admin", getRsvpsAdmin);

/* GET /api/rsvp/:id - Get a single RSVP by ID */
router.get("/:id", getRsvpById);

export default router;
