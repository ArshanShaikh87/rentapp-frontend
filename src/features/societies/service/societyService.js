import { apiRequest } from "../../../lib/apiClient";

// GET /api/v1/societies
export function getSocieties() {
  return apiRequest("/api/v1/societies");
}

// GET /api/v1/societies/{id}
export function getSocietyById(id) {
  return apiRequest(`/api/v1/societies/${id}`);
}

// POST /api/v1/societies
export function createSociety(societyData) {
  return apiRequest("/api/v1/societies", { method: "POST", body: societyData });
}

// PUT /api/v1/societies/{id}
export function updateSociety(id, societyData) {
  return apiRequest(`/api/v1/societies/${id}`, { method: "PUT", body: societyData });
}

// PATCH /api/v1/societies/{id}/deactivate
export function deactivateSociety(id) {
  return apiRequest(`/api/v1/societies/${id}/deactivate`, { method: "PATCH" });
}