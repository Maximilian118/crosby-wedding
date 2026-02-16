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
      res.status(400).json({ error: "Full name is required" });
      return;
    }

    const guest = await Guest.create({
      fullName: fullName.trim(),
      vegetarian,
      car,
      noAlcohol,
      comments,
    });

    res.status(201).json(guest);
  } catch (error) {
    console.error("Failed to create RSVP:", error);
    res.status(500).json({ error: "Failed to create RSVP" });
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
    console.error("Failed to fetch RSVPs:", error);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
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
    console.error("Failed to fetch RSVPs:", error);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
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
      res.status(404).json({ error: "RSVP not found" });
      return;
    }

    res.json(guest);
  } catch (error) {
    console.error("Failed to fetch RSVP:", error);
    res.status(500).json({ error: "Failed to fetch RSVP" });
  }
};
