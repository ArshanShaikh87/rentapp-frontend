export default function Notice({ type = "error", children }) {
  const styles =
    type === "success"
      ? "border-success/30 bg-success/10 text-success"
      : "border-danger/30 bg-danger/10 text-danger";

  return (
    <div role={type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}