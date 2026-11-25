import { Link } from "react-router-dom";
import { Hourglass } from "lucide-react";

export default function ComingSoonPage({ title }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-secondary text-secondary">
        <Hourglass size={26} />
      </div>
      <h1 className="mb-0 mt-5 text-2xl font-semibold text-text">{title}</h1>
      <p className="mb-0 mt-2 text-sm text-text-soft">
        This section is coming soon.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex rounded-xl border border-border px-4 py-2 text-sm font-medium text-text no-underline transition hover:bg-surface-secondary"
      >
        Back to dashboard
      </Link>
    </div>
  );
}