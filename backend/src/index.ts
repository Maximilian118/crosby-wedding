import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

/* Parse JSON request bodies */
app.use(express.json());

/* Enable CORS for the frontend origin */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

/* Mount RSVP routes */
app.use("/api/rsvp", rsvpRoutes);

/* Health check endpoint */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* Connect to database and start server */
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
