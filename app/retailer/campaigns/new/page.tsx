import CampaignForm from "@/components/retailer/CampaignForm";

export default function NewCampaignPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Campaign Setup</h1>
      <CampaignForm />
    </div>
  );
}
