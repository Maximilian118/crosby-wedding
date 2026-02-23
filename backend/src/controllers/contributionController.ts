import type { Request, Response } from "express";
import Contribution from "../models/Contribution.js";
import type { CreateContributionBody } from "../types/contribution.js";

/* Creates a new honeymoon fund contribution entry */
export const createContribution = async (
  req: Request<object, object, CreateContributionBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, message, amount } = req.body;

    if (!name || !name.trim()) {
      console.warn("[400] POST /api/contributions — missing name");
      res.status(400).json({ error: "Name is required", status: 400 });
      return;
    }

    if (!message || !message.trim()) {
      console.warn("[400] POST /api/contributions — missing message");
      res.status(400).json({ error: "Message is required", status: 400 });
      return;
    }

    const contribution = await Contribution.create({
      name: name.trim().replace(/\b\w/g, (c) => c.toUpperCase()),
      message: message.trim(),
      amount: amount && amount > 0 ? amount : undefined,
    });

    console.log(
      `[201] POST /api/contributions — created contribution from "${contribution.name}"`
    );
    res.status(201).json(contribution);
  } catch (error) {
    console.error(
      "[500] POST /api/contributions —",
      (error as Error).message
    );
    res
      .status(500)
      .json({ error: "Failed to create contribution", status: 500 });
  }
};

/* Returns all contributions sorted newest first */
export const getContributions = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const contributions = await Contribution.find({}).sort({ createdAt: -1 });
    res.json(contributions);
  } catch (error) {
    console.error(
      "[500] GET /api/contributions —",
      (error as Error).message
    );
    res
      .status(500)
      .json({ error: "Failed to fetch contributions", status: 500 });
  }
};
