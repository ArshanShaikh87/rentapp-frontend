export function validateLogin(values) {
  const errors = {};
  const loginId = values.loginId.trim();
  const password = values.password;

  if (!loginId) {
    errors.loginId = "Please enter your login ID or email.";
  } else if (/\s/.test(loginId)) {
    errors.loginId = "Login ID cannot contain spaces.";
  } else if (
    loginId.includes("@") &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId)
  ) {
    errors.loginId = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  }

  return errors;
}