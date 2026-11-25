import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  loading = false,
  error = "",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={loading ? () => {} : onCancel}>
      <p className="mb-0 text-sm text-text-soft">{message}</p>

      {error && (
        <p role="alert" className="mb-0 mt-4 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          fullWidth={false}
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          fullWidth={false}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}