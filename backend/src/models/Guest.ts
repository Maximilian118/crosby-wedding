import mongoose, { Schema, Document } from "mongoose";
import type { GuestType } from "../types/guest.js";

/* Mongoose document interface extending the Guest type */
export interface GuestDocument extends Omit<GuestType, "_id">, Document {}

/* Schema definition for a wedding guest RSVP entry */
const guestSchema = new Schema<GuestDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    vegetarian: { type: Boolean, default: false },
    car: { type: Boolean, default: false },
    noAlcohol: { type: Boolean, default: false },
    comments: { type: String, default: "" },
  },
  { timestamps: true }
);

const Guest = mongoose.model<GuestDocument>("Guest", guestSchema);

export default Guest;
