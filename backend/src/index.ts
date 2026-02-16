import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

/* Mask password in MongoDB URI for safe logging */
const maskUri = (uri: string): string =>
  uri.replace(/:([^@/]+)@/, ":****@");

/* Enable CORS for the frontend origin — must be first to handle preflight OPTIONS */
app.use(cors({ origin: CORS_ORIGIN }));

/* Log all incoming HTTP requests */
app.use(requestLogger);

/* Parse JSON request bodies */
app.use(express.json());

/* Mount RSVP routes */
app.use("/api/rsvp", rsvpRoutes);

/* Health check endpoint */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* Catch-all error handler */
app.use(errorHandler);

/* Connect to database and start server */
console.log("──────────────────────────────────────");
console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
console.log(`CORS origin: ${CORS_ORIGIN}`);
console.log(`MongoDB URI: ${maskUri(process.env.MONGODB_URI || "not set")}`);
console.log("──────────────────────────────────────");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("[FATAL] Failed to connect to database:", error);
    process.exit(1);
  });
