export default function BarChart({
  title,
  data,
}: {
  title: string;
  data: { name: string; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="text-sm font-semibold text-brand-dark">{title}</p>
      <div className="mt-4 space-y-3">
        {data.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
        {data.map((row) => (
          <div key={row.name} className="flex items-center gap-3 text-sm">
            <span className="w-40 shrink-0 truncate text-muted">{row.name}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${(row.count / max) * 100}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-medium text-brand-dark">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
