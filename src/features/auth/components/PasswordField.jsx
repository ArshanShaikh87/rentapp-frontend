
import { useState } from "react";
import Input from "../../../components/ui/Input";

export default function PasswordField({
  value,
  onChange,
  error,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id="password"
        name="password"
        label="Password"
        type={visible ? "text" : "password"}
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        error={error}
        autoComplete="current-password"
        className="pr-16"
        required
      />

      <button
        type="button"
        className="absolute right-3 top-[2.15rem] rounded-md px-2 py-1 text-xs font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
