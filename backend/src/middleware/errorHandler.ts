import type { Request, Response, NextFunction } from "express";

/* Catch-all error handler — logs unhandled errors and returns a consistent JSON response */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

  const status = (err as Error & { status?: number }).status || 500;
  res.status(status).json({ error: err.message || "Internal server error", status });
};

export default errorHandler;
