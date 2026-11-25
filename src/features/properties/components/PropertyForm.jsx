import { useState } from "react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const PROPERTY_NUMBER = /^[a-zA-Z0-9-]+$/;
const INTEGER = /^-?\d+$/;
const TYPE_SUGGESTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "Shop", "Office"];

// Mirrors the backend rules in CreatePropertyRequest / UpdatePropertyRequest.
function validate(values, isEdit) {
  const errors = {};
  const number = values.propertyNumber.trim();
  const type = values.propertyType.trim();
  const floor = values.floorNumber.trim();

  if (!isEdit && !values.societyId) errors.societyId = "Society is required";

  if (!number) errors.propertyNumber = "Flat number is required";
  else if (number.length > 20)
    errors.propertyNumber = "Flat number must be 20 characters or less";
  else if (!PROPERTY_NUMBER.test(number))
    errors.propertyNumber = "Only letters, numbers and '-' allowed";

  if (!type) errors.propertyType = "Flat type is required";
  else if (type.length > 30)
    errors.propertyType = "Flat type must be 30 characters or less";

  if (floor && !INTEGER.test(floor))
    errors.floorNumber = "Floor must be a whole number";

  return errors;
}

export default function PropertyForm({
  property,
  societies,
  defaultSocietyId = "",
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(property);

  const [values, setValues] = useState({
    societyId: property ? String(property.societyId) : String(defaultSocietyId ?? ""),
    propertyNumber: property?.propertyNumber ?? "",
    propertyType: property?.propertyType ?? "",
    floorNumber:
      property?.floorNumber === null || property?.floorNumber === undefined
        ? ""
        : String(property.floorNumber),
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

    const validationErrors = validate(values, isEdit);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      propertyNumber: values.propertyNumber.trim(),
      propertyType: values.propertyType.trim(),
      floorNumber: values.floorNumber.trim() === "" ? null : Number(values.floorNumber),
    };
    // societyId is only accepted on create (update API doesn't take it).
    if (!isEdit) payload.societyId = Number(values.societyId);

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setServerError(err.message || "Unable to save property.");
      setSubmitting(false);
    }
  };

  const societyOptions = societies.map((s) => ({ value: String(s.id), label: s.name }));

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Select
        id="property-society"
        name="societyId"
        label="Society"
        placeholder="Select society"
        options={societyOptions}
        value={values.societyId}
        onChange={handleChange}
        error={errors.societyId}
        disabled={submitting || isEdit}
      />
      {isEdit && (
        <p className="-mt-2 mb-0 text-xs text-text-soft">
          Society cannot be changed after the property is created.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="property-number"
          name="propertyNumber"
          label="Flat number"
          placeholder="e.g. A-101"
          maxLength={20}
          value={values.propertyNumber}
          onChange={handleChange}
          error={errors.propertyNumber}
          disabled={submitting}
        />
        <Input
          id="property-floor"
          name="floorNumber"
          label="Floor (optional)"
          placeholder="e.g. 1"
          inputMode="numeric"
          value={values.floorNumber}
          onChange={handleChange}
          error={errors.floorNumber}
          disabled={submitting}
        />
      </div>

      <Input
        id="property-type"
        name="propertyType"
        label="Flat type"
        placeholder="e.g. 2 BHK"
        list="property-type-options"
        maxLength={30}
        value={values.propertyType}
        onChange={handleChange}
        error={errors.propertyType}
        disabled={submitting}
      />
      <datalist id="property-type-options">
        {TYPE_SUGGESTIONS.map((type) => (
          <option key={type} value={type} />
        ))}
      </datalist>

      {serverError && (
        <p role="alert" className="mb-0 text-sm font-medium text-danger">{serverError}</p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button variant="outline" size="sm" fullWidth={false} onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" size="sm" fullWidth={false} loading={submitting}>
          {isEdit ? "Save changes" : "Add property"}
        </Button>
      </div>
    </form>
  );
}