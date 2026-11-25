import { apiRequest, ApiError } from "../../../lib/apiClient";

// GET /api/v1/property
// Backend returns 404 "Properties not found" when the owner has no properties yet.
// For the UI that is just an empty list, not an error.
export async function getProperties() {
  try {
    return await apiRequest("/api/v1/property");
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return [];
    throw err;
  }
}

// GET /api/v1/property/{id}
export function getPropertyById(id) {
  return apiRequest(`/api/v1/property/${id}`);
}

// POST /api/v1/property   { societyId, propertyNumber, propertyType, floorNumber }
export function createProperty(propertyData) {
  return apiRequest("/api/v1/property", { method: "POST", body: propertyData });
}

// PUT /api/v1/property/{id}   { propertyNumber, propertyType, floorNumber }
export function updateProperty(id, propertyData) {
  return apiRequest(`/api/v1/property/${id}`, { method: "PUT", body: propertyData });
}

// PATCH /api/v1/property/{id}/deactivate
export function deactivateProperty(id) {
  return apiRequest(`/api/v1/property/${id}/deactivate`, { method: "PATCH" });
}