import type { Request, Response } from "express";
import Guest from "../models/Guest.js";
import type { CreateRsvpBody } from "../types/guest.js";

/* Creates a new RSVP guest entry */
export const createRsvp = async (
  req: Request<object, object, CreateRsvpBody>,
  res: Response
): Promise<void> => {
  try {
    const { fullName, vegetarian, car, noAlcohol, comments } = req.body;

    if (!fullName || !fullName.trim()) {
      console.warn("[400] POST /api/rsvp — missing fullName");
      res.status(400).json({ error: "Full name is required", status: 400 });
      return;
    }

    const guest = await Guest.create({
      fullName: fullName.trim().replace(/\b\w/g, (c) => c.toUpperCase()),
      vegetarian,
      car,
      noAlcohol,
      comments,
    });

    console.log(`[201] POST /api/rsvp — created RSVP for "${guest.fullName}"`);
    res.status(201).json(guest);
  } catch (error) {
    console.error("[500] POST /api/rsvp —", (error as Error).message);
    res.status(500).json({ error: "Failed to create RSVP", status: 500 });
  }
};

/* Returns all RSVPs with only names visible (public endpoint) */
export const getRsvps = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const guests = await Guest.find({}, "fullName createdAt").sort({
      createdAt: -1,
    });
    res.json(guests);
  } catch (error) {
    console.error("[500] GET /api/rsvp —", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch RSVPs", status: 500 });
  }
};

/* Returns all RSVPs with full details (admin endpoint) */
export const getRsvpsAdmin = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const guests = await Guest.find({}).sort({ createdAt: -1 });
    res.json(guests);
  } catch (error) {
    console.error("[500] GET /api/rsvp/admin —", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch RSVPs", status: 500 });
  }
};

/* Returns a single RSVP by ID with full details */
export const getRsvpById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      console.warn(`[404] GET /api/rsvp/${req.params.id} — not found`);
      res.status(404).json({ error: "RSVP not found", status: 404 });
      return;
    }

    res.json(guest);
  } catch (error) {
    console.error(`[500] GET /api/rsvp/${req.params.id} —`, (error as Error).message);
    res.status(500).json({ error: "Failed to fetch RSVP", status: 500 });
  }
};
