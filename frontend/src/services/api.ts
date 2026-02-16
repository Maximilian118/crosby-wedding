import type { GuestType, CreateRsvpBody } from "../types/guest";

/* Base URL for API calls — empty in dev (uses Vite proxy), full URL in production */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/* Generic helper to make fetch requests and parse JSON responses */
const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const method = options?.method || "GET";
  const fullUrl = `${API_BASE}${url}`;
  console.log(`[API] ${method} ${fullUrl}`);

  const response = await fetch(fullUrl, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    console.error(`[API] ${method} ${fullUrl} — ${response.status} ${error.error}`);
    throw new Error(error.error || "Request failed");
  }

  console.log(`[API] ${method} ${fullUrl} — ${response.status} OK`);
  return response.json();
};

/* Submits a new RSVP entry */
export const submitRsvp = (data: CreateRsvpBody): Promise<GuestType> => {
  return fetchJson<GuestType>("/api/rsvp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* Fetches all RSVPs (public view, names only) */
export const getRsvps = (): Promise<GuestType[]> => {
  return fetchJson("/api/rsvp");
};

/* Fetches all RSVPs with full details (admin view) */
export const getRsvpsAdmin = (): Promise<GuestType[]> => {
  return fetchJson("/api/rsvp/admin");
};

/* Fetches a single RSVP by ID */
export const getRsvpById = (id: string): Promise<GuestType> => {
  return fetchJson(`/api/rsvp/${id}`);
};
