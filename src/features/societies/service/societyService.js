
import { getCsrfToken } from "../../auth/services/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleApiError(response) {
  const message = await response.text();

  throw new Error(
    message || `Request failed with status ${response.status}`
  );
}

async function sendRequest(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.status === 204 ? null : response.json();
}

// Get all societies
export async function getSocieties() {
  return sendRequest("/api/v1/societies");
}

// Get society by ID
export async function getSocietyById(id) {
  return sendRequest(`/api/v1/societies/${id}`);
}

// Create society
export async function createSociety(societyData) {
  const csrfToken = await getCsrfToken();

  return sendRequest("/api/v1/societies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(societyData),
  });
}

// Update society
export async function updateSociety(id, societyData) {
  const csrfToken = await getCsrfToken();

  return sendRequest(`/api/v1/societies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(societyData),
  });
}

// Deactivate society
export async function deactivateSociety(id) {
  const csrfToken = await getCsrfToken();

  return sendRequest(`/api/v1/societies/${id}/deactivate`, {
    method: "PATCH",
    headers: {
      "X-XSRF-TOKEN": csrfToken,
    },
  });
}
