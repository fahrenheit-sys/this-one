import { type ReactNode } from "react";

export default function OptionCard({
  icon,
  label,
  sublabel,
  description,
  enabled = true,
  selected = false,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  description?: string;
  enabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      aria-pressed={selected}
      className={`flex h-full flex-col items-center rounded-xl border p-5 text-center transition ${
        selected
          ? "border-brand bg-brand-light"
          : "border-black/10 bg-white hover:border-brand"
      } ${!enabled ? "cursor-not-allowed opacity-40 hover:border-black/10" : ""}`}
    >
      <div className="text-brand-dark">{icon}</div>
      <p className="mt-3 italic font-semibold text-brand-dark">{label}</p>
      {sublabel && <p className="mt-1 text-sm text-muted">({sublabel})</p>}
      {description && <p className="mt-2 text-xs text-muted">{description}</p>}
    </button>
  );
}
