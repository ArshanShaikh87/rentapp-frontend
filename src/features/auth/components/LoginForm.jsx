
import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PasswordField from "./PasswordField";
import { validateLogin } from "../schemas/loginValidation";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const [values, setValues] = useState({
    loginId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setMessage(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const authenticatedUser = await login(values);

      setMessage({
        type: "success",
        text: `Login successful! Welcome, ${authenticatedUser.loginId}.`,
      });

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Login failed. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  }

  function handleContactOwner() {
    setMessage({
      type: "info",
      text: "Please contact your property owner to get help with your login credentials.",
    });
  }

  const messageStyles = {
    success: "border-success/20 bg-success/10 text-success",
    error: "border-danger/20 bg-danger/10 text-danger",
    info: "border-info/20 bg-info/10 text-info",
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        id="loginId"
        name="loginId"
        label="Login ID or Email"
        type="text"
        placeholder="Enter your login ID or email"
        value={values.loginId}
        onChange={handleChange}
        error={errors.loginId}
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
      />

      <PasswordField
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs leading-5 ${
            messageStyles[message.type] ?? messageStyles.info
          }`}
          role={message.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message.text}
        </div>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          loading={loading}
          className="tracking-wide"
        >
          Log in
        </Button>
      </div>

      <div className="text-center">
        <p className="mb-1 text-xs text-text-soft">
          Need help accessing your account?
        </p>

        <button
          type="button"
          className="rounded-md text-xs font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 transition hover:decoration-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={handleContactOwner}
        >
          Contact your property owner
        </button>
      </div>
    </form>
  );
}
