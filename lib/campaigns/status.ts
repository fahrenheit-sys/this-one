import type { campaigns } from "@/lib/db/schema";

type CampaignDates = Pick<typeof campaigns.$inferSelect, "isDraft" | "startDate" | "endDate">;

export type CampaignStatus = "draft" | "upcoming" | "active" | "completed";

export function getCampaignStatus(campaign: CampaignDates): CampaignStatus {
  if (campaign.isDraft) return "draft";

  const now = new Date();
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);

  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
}

export const STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  upcoming: "Upcoming",
  active: "Active",
  completed: "Completed",
};
