import morgan from "morgan";
import type { StreamOptions } from "morgan";

/* Custom stream that writes to stdout via console.log (ensures Docker captures logs) */
const stream: StreamOptions = {
  write: (message: string) => console.log(message.trim()),
};

/* Formats a Date as YYYY-MM-DD HH:MM:SS */
const timestamp = (): string => new Date().toISOString().replace("T", " ").slice(0, 19);

/* HTTP request logger — logs method, URL, status, and response time for every request */
const requestLogger = morgan(
  (tokens, req, res) =>
    [
      `[${timestamp()}]`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      `${tokens["response-time"](req, res)} ms`,
    ].join(" "),
  { stream }
);

export default requestLogger;
