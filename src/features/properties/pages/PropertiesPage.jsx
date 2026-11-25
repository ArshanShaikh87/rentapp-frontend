import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { House, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Notice from "../../../components/ui/Notice";
import Select from "../../../components/ui/Select";
import Pagination from "../../../components/ui/Pagination";
import { useAsyncData } from "../../../hooks/useAsyncData";
import { getSocieties } from "../../societies/service/societyService";
import PropertyForm from "../components/PropertyForm";
import {
  createProperty,
  deactivateProperty,
  getProperties,
  updateProperty,
} from "../service/propertyService";

const PAGE_SIZE = 10;

// Module-level so the reference stays stable for useAsyncData.
function loadPropertiesData() {
  return Promise.all([getProperties(), getSocieties()]).then(
    ([properties, societies]) => ({ properties, societies })
  );
}

function PropertiesPage() {
  const { data, loading, error, reload } = useAsyncData(loadPropertiesData);
  const properties = useMemo(() => data?.properties ?? [], [data]);
  const societies = useMemo(() => data?.societies ?? [], [data]);

  // Filters + page live in the URL: /properties?q=a-1&society=3&page=2
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const societyFilter = searchParams.get("society") ?? "";
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const updateParams = (changes) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(changes).forEach(([key, value]) => {
          if (value === "" || value === null || value === undefined) next.delete(key);
          else next.set(key, String(value));
        });
        return next;
      },
      { replace: true }
    );
  };

  // dialog: null | { mode: "create" } | { mode: "edit", property } | { mode: "delete", property }
  const [dialog, setDialog] = useState(null);
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const societyNameById = useMemo(
    () => Object.fromEntries(societies.map((s) => [s.id, s.name])),
    [societies]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return properties.filter((p) => {
      if (societyFilter && String(p.societyId) !== societyFilter) return false;
      if (!term) return true;
      return (
        p.propertyNumber.toLowerCase().includes(term) ||
        p.propertyType.toLowerCase().includes(term)
      );
    });
  }, [properties, societyFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
      await updateProperty(dialog.property.id, values);
      showNotice("Property updated successfully.");
    } else {
      await createProperty(values);
      showNotice("Property added successfully.");
    }
    closeDialog();
    reload();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await deactivateProperty(dialog.property.id);
      showNotice("Property deleted successfully.");
      closeDialog();
      reload();
    } catch (err) {
      setDeleteError(err.message || "Unable to delete property.");
    } finally {
      setDeleting(false);
    }
  };

  const hasSocieties = societies.length > 0;
  const initialLoading = loading && !data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-0 text-2xl font-semibold text-text">Properties</h1>
          <p className="mb-0 mt-1 text-sm text-text-soft">
            Manage flats and units inside your societies.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" fullWidth={false} onClick={reload} disabled={loading}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button
            size="sm"
            fullWidth={false}
            onClick={() => setDialog({ mode: "create" })}
            disabled={!hasSocieties}
          >
            <Plus size={16} />
            Add property
          </Button>
        </div>
      </div>

      {notice && <Notice type="success">{notice}</Notice>}

      {/* Count */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-surface-secondary p-3 text-secondary">
            <House size={22} />
          </div>
          <div>
            <p className="mb-0 text-sm text-text-soft">Total properties</p>
            <p className="mb-0 text-2xl font-semibold text-text">{properties.length}</p>
          </div>
        </div>
      </div>

      {initialLoading && (
        <div className="py-12 text-center text-text-soft">Loading properties...</div>
      )}

      {!loading && error && <Notice>{error}</Notice>}

      {/* No society yet */}
      {!loading && !error && !hasSocieties && (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center">
          <House size={36} className="mx-auto text-text-soft" />
          <h3 className="mb-0 mt-4 font-medium text-text">Add a society first</h3>
          <p className="mb-0 mt-2 text-sm text-text-soft">
            Properties belong to a society. Create a society from the Societies page, then come back here.
          </p>
        </div>
      )}

      {/* Society exists, but no property */}
      {!loading && !error && hasSocieties && properties.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center">
          <House size={36} className="mx-auto text-text-soft" />
          <h3 className="mb-0 mt-4 font-medium text-text">No properties yet</h3>
          <p className="mb-0 mt-2 text-sm text-text-soft">
            Add your first flat or unit to get started.
          </p>
          <div className="mt-5 flex justify-center">
            <Button size="sm" fullWidth={false} onClick={() => setDialog({ mode: "create" })}>
              <Plus size={16} />
              Add property
            </Button>
          </div>
        </div>
      )}

      {properties.length > 0 && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-soft" />
              <input
                type="text"
                value={search}
                onChange={(e) => updateParams({ q: e.target.value, page: "" })}
                placeholder="Search by flat number or type"
                aria-label="Search properties"
                className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text outline-none transition placeholder:text-text-soft/65 focus:border-secondary focus:ring-4 focus:ring-secondary/10"
              />
            </div>
            <Select
              id="filter-society"
              aria-label="Filter by society"
              placeholder="All societies"
              options={societies.map((s) => ({ value: String(s.id), label: s.name }))}
              value={societyFilter}
              onChange={(e) => updateParams({ society: e.target.value, page: "" })}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface py-10 text-center text-sm text-text-soft">
              No properties match your filters.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-border bg-surface-secondary text-xs uppercase tracking-wider text-text-soft">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Flat no.</th>
                      <th className="px-5 py-3 font-semibold">Society</th>
                      <th className="px-5 py-3 font-semibold">Type</th>
                      <th className="px-5 py-3 font-semibold">Floor</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((property) => (
                      <tr key={property.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-4 font-medium text-text">{property.propertyNumber}</td>
                        <td className="px-5 py-4 text-text-soft">
                          {societyNameById[property.societyId] ?? `Society #${property.societyId}`}
                        </td>
                        <td className="px-5 py-4 text-text-soft">{property.propertyType}</td>
                        <td className="px-5 py-4 text-text-soft">{property.floorNumber ?? "—"}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                            Active
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setDialog({ mode: "edit", property })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-soft transition hover:bg-surface-secondary hover:text-text"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDialog({ mode: "delete", property })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-danger transition hover:bg-danger/10"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={PAGE_SIZE}
                onPageChange={(next) => updateParams({ page: next === 1 ? "" : next })}
              />
            </>
          )}
        </>
      )}

      {/* Create / Edit */}
      {(dialog?.mode === "create" || dialog?.mode === "edit") && (
        <Modal
          title={dialog.mode === "edit" ? "Edit property" : "Add property"}
          description="Enter the property details."
          onClose={closeDialog}
        >
          <PropertyForm
            property={dialog.property}
            societies={societies}
            defaultSocietyId={societyFilter}
            onSubmit={handleSave}
            onCancel={closeDialog}
          />
        </Modal>
      )}

      {/* Delete */}
      {dialog?.mode === "delete" && (
        <ConfirmDialog
          title="Delete property?"
          message={`Property "${dialog.property.propertyNumber}" will be removed from your list.`}
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

export default PropertiesPage;