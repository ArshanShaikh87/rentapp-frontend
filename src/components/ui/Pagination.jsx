import { ChevronLeft, ChevronRight } from "lucide-react";

function pageNumbers(page, totalPages) {
  // Always show first, last and 1 page around the current one.
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result = [];
  sorted.forEach((p, index) => {
    if (index > 0 && p - sorted[index - 1] > 1) result.push("gap-" + p);
    result.push(p);
  });
  return result;
}

export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const buttonBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="mb-0 text-sm text-text-soft">
        Showing {from}–{to} of {totalItems}
      </p>

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className={`${buttonBase} border-border text-text-soft hover:bg-surface-secondary hover:text-text`}
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers(page, totalPages).map((item) =>
            typeof item === "string" ? (
              <span key={item} className="px-1 text-text-soft">…</span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? "page" : undefined}
                className={`${buttonBase} ${
                  item === page
                    ? "border-secondary bg-secondary text-secondary-text"
                    : "border-border text-text-soft hover:bg-surface-secondary hover:text-text"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className={`${buttonBase} border-border text-text-soft hover:bg-surface-secondary hover:text-text`}
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}