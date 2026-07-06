export default function Leaderboard({
  title,
  data,
}: {
  title: string;
  data: { name: string; count: number }[];
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="text-sm font-semibold text-brand-dark">{title}</p>
      <table className="mt-3 w-full text-left text-sm">
        <thead className="text-xs uppercase text-muted">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2 text-right">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-t border-black/5">
              <td className="py-2">{row.name}</td>
              <td className="py-2 text-right font-medium text-brand-dark">{row.count}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={2} className="py-4 text-center text-muted">
                No data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
