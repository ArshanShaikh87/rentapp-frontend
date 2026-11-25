import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const LETTERS_ONLY = /^[a-zA-Z\s]+$/;
const PINCODE = /^[1-9][0-9]{5}$/;

// Mirrors the backend rules in CreateSocietyRequest / UpdateSocietyRequest.
function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const address = values.address.trim();
  const city = values.city.trim();
  const state = values.state.trim();

  if (!name) errors.name = "Society name is required";
  else if (name.length < 3 || name.length > 100)
    errors.name = "Society name must be between 3 and 100 characters";

  if (!address) errors.address = "Address is required";
  else if (address.length < 5 || address.length > 255)
    errors.address = "Address must be between 5 and 255 characters";

  if (!city) errors.city = "City is required";
  else if (city.length < 2 || city.length > 50)
    errors.city = "City name must be between 2 and 50 characters";
  else if (!LETTERS_ONLY.test(city))
    errors.city = "City name must contain only letters and spaces";

  if (!state) errors.state = "State is required";
  else if (state.length < 2 || state.length > 50)
    errors.state = "State name must be between 2 and 50 characters";
  else if (!LETTERS_ONLY.test(state))
    errors.state = "State name must contain only letters and spaces";

  if (!values.pincode.trim()) errors.pincode = "Pincode is required";
  else if (!PINCODE.test(values.pincode.trim()))
    errors.pincode = "Pincode must be a valid 6-digit number";

  return errors;
}

export default function SocietyForm({ society, onSubmit, onCancel }) {
  const isEdit = Boolean(society);

  const [values, setValues] = useState({
    name: society?.name ?? "",
    address: society?.address ?? "",
    city: society?.city ?? "",
    state: society?.state ?? "",
    pincode: society?.pincode ?? "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        pincode: values.pincode.trim(),
      });
    } catch (err) {
      setServerError(err.message || "Unable to save society.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input id="society-name" name="name" label="Society name" placeholder="e.g. Green Valley Residency"
        value={values.name} onChange={handleChange} error={errors.name} disabled={submitting} />
      <Input id="society-address" name="address" label="Address" placeholder="Street / area"
        value={values.address} onChange={handleChange} error={errors.address} disabled={submitting} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input id="society-city" name="city" label="City" placeholder="Pune"
          value={values.city} onChange={handleChange} error={errors.city} disabled={submitting} />
        <Input id="society-state" name="state" label="State" placeholder="Maharashtra"
          value={values.state} onChange={handleChange} error={errors.state} disabled={submitting} />
      </div>

      <Input id="society-pincode" name="pincode" label="Pincode" placeholder="411001" inputMode="numeric" maxLength={6}
        value={values.pincode} onChange={handleChange} error={errors.pincode} disabled={submitting} />

      {serverError && (
        <p role="alert" className="mb-0 text-sm font-medium text-danger">{serverError}</p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button variant="outline" size="sm" fullWidth={false} onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" size="sm" fullWidth={false} loading={submitting}>
          {isEdit ? "Save changes" : "Add society"}
        </Button>
      </div>
    </form>
  );
}