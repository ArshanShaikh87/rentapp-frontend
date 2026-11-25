import { getCsrfToken } from "../features/auth/services/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function fallbackMessage(status) {
  if (status === 401) return "Your session has expired. Please log in again.";
  if (status === 403) return "You don't have permission to do this.";
  if (status === 404) return "The requested item was not found.";
  return `Request failed with status ${status}`;
}

/**
 * Shared request helper for all feature services.
 * - Always sends the session cookie.
 * - Adds the CSRF header for every non-GET request.
 * - Backend errors are plain text, so we surface them as ApiError.message.
 */
export async function apiRequest(path, { method = "GET", body } = {}) {
  const headers = { Accept: "application/json" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (method !== "GET") {
    headers["X-XSRF-TOKEN"] = await getCsrfToken();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new ApiError(text || fallbackMessage(response.status), response.status);
  }

  return text ? JSON.parse(text) : null;
}