import { useState } from "react";
import { Building2, MapPin, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Notice from "../../../components/ui/Notice";
import { useAsyncData } from "../../../hooks/useAsyncData";
import SocietyForm from "../components/SocietyForm";
import {
  createSociety,
  deactivateSociety,
  getSocieties,
  updateSociety,
} from "../service/societyService";

function SocietiesPage() {
  const { data, loading, error, reload } = useAsyncData(getSocieties);
  const societies = data ?? [];

  // dialog: null | { mode: "create" } | { mode: "edit", society } | { mode: "delete", society }
  const [dialog, setDialog] = useState(null);
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const closeDialog = () => {
    setDialog(null);
    setDeleteError("");
  };

  const showNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 4000);
  };

  const handleSave = async (values) => {
    if (dialog.mode === "edit") {
      await updateSociety(dialog.society.id, values);
      showNotice("Society updated successfully.");
    } else {
      await createSociety(values);
      showNotice("Society added successfully.");
    }
    closeDialog();
    reload();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await deactivateSociety(dialog.society.id);
      showNotice("Society deleted successfully.");
      closeDialog();
      reload();
    } catch (err) {
      setDeleteError(err.message || "Unable to delete society.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-0 text-2xl font-semibold text-text">Societies</h1>
          <p className="mb-0 mt-1 text-sm text-text-soft">
            Manage your residential societies.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" fullWidth={false} onClick={reload} disabled={loading}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button size="sm" fullWidth={false} onClick={() => setDialog({ mode: "create" })}>
            <Plus size={16} />
            Add society
          </Button>
        </div>
      </div>

      {notice && <Notice type="success">{notice}</Notice>}

      {/* Count */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-surface-secondary p-3 text-secondary">
            <Building2 size={22} />
          </div>
          <div>
            <p className="mb-0 text-sm text-text-soft">Total societies</p>
            <p className="mb-0 text-2xl font-semibold text-text">{societies.length}</p>
          </div>
        </div>
      </div>

      {loading && !data && (
        <div className="py-12 text-center text-text-soft">Loading societies...</div>
      )}

      {!loading && error && <Notice>{error}</Notice>}

      {!loading && !error && societies.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center">
          <Building2 size={36} className="mx-auto text-text-soft" />
          <h3 className="mb-0 mt-4 font-medium text-text">No societies yet</h3>
          <p className="mb-0 mt-2 text-sm text-text-soft">
            Add your first society to start adding properties.
          </p>
          <div className="mt-5 flex justify-center">
            <Button size="sm" fullWidth={false} onClick={() => setDialog({ mode: "create" })}>
              <Plus size={16} />
              Add society
            </Button>
          </div>
        </div>
      )}

      {societies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {societies.map((society) => (
            <div
              key={society.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-5 transition hover:border-secondary/40"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-surface-secondary p-3 text-secondary">
                  <Building2 size={22} />
                </div>
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  Active
                </span>
              </div>

              <h3 className="mb-0 mt-4 text-lg font-semibold text-text">{society.name}</h3>

              <div className="mt-3 flex flex-1 items-start gap-2 text-sm text-text-soft">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <p className="mb-0">
                  {society.address}, {society.city}, {society.state} - {society.pincode}
                </p>
              </div>

              <div className="mt-5 flex gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setDialog({ mode: "edit", society })}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-soft transition hover:bg-surface-secondary hover:text-text"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDialog({ mode: "delete", society })}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-danger transition hover:bg-danger/10"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit */}
      {(dialog?.mode === "create" || dialog?.mode === "edit") && (
        <Modal
          title={dialog.mode === "edit" ? "Edit society" : "Add society"}
          description="Enter the society details."
          onClose={closeDialog}
        >
          <SocietyForm society={dialog.society} onSubmit={handleSave} onCancel={closeDialog} />
        </Modal>
      )}

      {/* Delete */}
      {dialog?.mode === "delete" && (
        <ConfirmDialog
          title="Delete society?"
          message={`"${dialog.society.name}" will be removed from your list. You can no longer add properties to it.`}
          confirmLabel="Delete"
          loading={deleting}
          error={deleteError}
          onConfirm={handleDelete}
          onCancel={closeDialog}
        />
      )}
    </div>
  );
}

export default SocietiesPage;