export default function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-dark">{value}</p>
      {hint && <p className="mt-1 text-xs text-brand">{hint}</p>}
    </div>
  );
}
