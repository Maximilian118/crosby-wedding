import type { GuestType, CreateRsvpBody } from "../types/guest";
import type {
  ContributionType,
  CreateContributionBody,
} from "../types/contribution";

/* Base URL for API calls — empty in dev (uses Vite proxy), full URL in production */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/* Generic helper to make fetch requests and parse JSON responses */
const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const method = options?.method || "GET";
  const fullUrl = `${API_BASE}${url}`;
  console.log(`[API] ${method} ${fullUrl}`);

  /* Only set Content-Type on requests with a body — avoids CORS preflight on GET */
  const headers: HeadersInit = options?.body
    ? { "Content-Type": "application/json" }
    : {};

  const response = await fetch(fullUrl, {
    headers,
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

/* Submits a new honeymoon fund contribution */
export const submitContribution = (
  data: CreateContributionBody
): Promise<ContributionType> => {
  return fetchJson<ContributionType>("/api/contributions", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* Fetches all honeymoon fund contributions */
export const getContributions = (): Promise<ContributionType[]> => {
  return fetchJson("/api/contributions");
};
