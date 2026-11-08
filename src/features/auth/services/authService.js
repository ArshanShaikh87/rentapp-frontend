
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Read a cookie stored by the browser.
function getCookie(name) {
  const cookies = document.cookie.split(";");

  const cookie = cookies.find((item) =>
    item.trim().startsWith(`${name}=`)
  );

  return cookie
    ? decodeURIComponent(cookie.trim().substring(name.length + 1))
    : null;
}

// Convert backend error responses into readable messages.
async function handleApiError(response) {
  const message = await response.text();

  throw new Error(
    message || `Request failed with status ${response.status}`
  );
}

// Initialize CSRF token and obtain the raw cookie value.
export async function getCsrfToken() {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/auth/csrf`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  const csrfToken = getCookie("XSRF-TOKEN");

  if (!csrfToken) {
    throw new Error("Unable to initialize CSRF token.");
  }

  return csrfToken;
}

// Authenticate the user.
export async function loginUser(credentials) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      body: JSON.stringify({
        loginId: credentials.loginId,
        password: credentials.password,
      }),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

// Retrieve the currently authenticated user.
export async function getCurrentUser() {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/auth/me`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

// Logout the current user.
export async function logoutUser() {
  const csrfToken = await getCsrfToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return true;
}
