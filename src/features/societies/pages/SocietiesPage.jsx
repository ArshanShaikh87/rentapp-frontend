
import { useEffect, useState } from "react";
import { Building2, MapPin, RefreshCw } from "lucide-react";
import { getSocieties } from "../services/societyService";

function SocietiesPage() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSocieties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSocieties();
      setSocieties(data);
    } catch (err) {
      setError(err.message || "Failed to load societies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Societies
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your residential societies.
          </p>
        </div>

        <button
          onClick={fetchSocieties}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Society Count */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <Building2 size={22} className="text-cyan-400" />
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Total Societies
            </p>
            <p className="text-2xl font-semibold text-white">
              {societies.length}
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-12 text-center text-slate-400">
          Loading societies...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && societies.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 py-14 text-center">
          <Building2
            size={36}
            className="mx-auto text-slate-500"
          />
          <h3 className="mt-4 font-medium text-white">
            No societies found
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Your societies will appear here once added.
          </p>
        </div>
      )}

      {/* Society List */}
      {!loading && !error && societies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {societies.map((society) => (
            <div
              key={society.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-slate-500"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-slate-800 p-3">
                  <Building2
                    size={22}
                    className="text-cyan-400"
                  />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  Active
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {society.name}
              </h3>

              <div className="mt-3 flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <p>
                  {society.address}, {society.city}, {society.state} -{" "}
                  {society.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SocietiesPage;
