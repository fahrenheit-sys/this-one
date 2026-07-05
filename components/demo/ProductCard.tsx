import { IconVitamins } from "@/components/icons/DemoIcons";

export default function ProductCard({
  rank,
  name,
  location,
  price,
  badge,
}: {
  rank: string;
  name: string;
  location: string;
  price: string;
  badge?: { label: string; className: string };
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white p-5 text-center ${badge ? "pl-8" : ""}`}
    >
      {badge && (
        <div
          className={`absolute left-0 top-0 flex h-full w-6 items-center justify-center text-[10px] font-semibold tracking-wide text-white ${badge.className}`}
        >
          <span className="[writing-mode:vertical-rl] rotate-180">{badge.label}</span>
        </div>
      )}

      <p className="text-xs text-muted">{rank}</p>

      <div className="mx-auto mt-2 flex h-20 w-20 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
        <IconVitamins className="h-10 w-10" />
      </div>

      <p className="mt-3 font-semibold text-brand-dark">{name}</p>
      <p className="mt-1 text-xs text-muted">{location}</p>

      <div className="mt-auto pt-4">
        <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white">
          {price}
        </span>
      </div>
    </div>
  );
}
