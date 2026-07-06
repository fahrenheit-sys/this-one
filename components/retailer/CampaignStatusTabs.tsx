import Link from "next/link";
import { STATUS_LABELS, type CampaignStatus } from "@/lib/campaigns/status";

const TABS: Array<{ id: CampaignStatus | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "active", label: STATUS_LABELS.active },
  { id: "upcoming", label: STATUS_LABELS.upcoming },
  { id: "completed", label: STATUS_LABELS.completed },
  { id: "draft", label: STATUS_LABELS.draft },
];

export default function CampaignStatusTabs({ active }: { active: CampaignStatus | "all" }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-full bg-surface p-1">
      {TABS.map((tab) => (
        <Link
          key={tab.id}
          href={tab.id === "all" ? "/retailer/campaigns" : `/retailer/campaigns?status=${tab.id}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            active === tab.id ? "bg-brand text-white" : "text-muted hover:text-brand-dark"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
