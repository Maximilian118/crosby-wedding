import mongoose, { Schema, Document } from "mongoose";
import type { ContributionType } from "../types/contribution.js";

/* Mongoose document interface extending the Contribution type */
export interface ContributionDocument
  extends Omit<ContributionType, "_id">,
    Document {}

/* Schema definition for a honeymoon fund contribution entry */
const contributionSchema = new Schema<ContributionDocument>(
  {
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    amount: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Contribution = mongoose.model<ContributionDocument>(
  "Contribution",
  contributionSchema
);

export default Contribution;
