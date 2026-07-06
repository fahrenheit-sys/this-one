import { upsertCampaign } from "@/app/retailer/campaigns/actions";
import { CATEGORIES } from "@/lib/taxonomy";
import type { campaigns } from "@/lib/db/schema";

type Campaign = typeof campaigns.$inferSelect;

export default function CampaignForm({ campaign }: { campaign?: Campaign }) {
  return (
    <form action={upsertCampaign} className="space-y-6">
      {campaign && <input type="hidden" name="campaignId" value={campaign.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Campaign name</span>
          <input
            type="text"
            name="name"
            required
            defaultValue={campaign?.name}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block text-sm">
            <span className="font-medium text-brand-dark">Start date</span>
            <input
              type="date"
              name="startDate"
              required
              defaultValue={campaign?.startDate}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-brand-dark">End date</span>
            <input
              type="date"
              name="endDate"
              required
              defaultValue={campaign?.endDate}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Max SKUs per category</span>
          <input
            type="number"
            name="maxSkusPerCategory"
            min={1}
            required
            defaultValue={campaign?.maxSkusPerCategory}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Cost per SKU</span>
          <input
            type="number"
            name="costPerSku"
            min={0}
            step={0.01}
            required
            defaultValue={campaign ? campaign.costPerSkuCents / 100 : undefined}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <span className="mt-1 block text-xs text-muted">
            Fee a supplier pays to occupy one SKU slot in this campaign.
          </span>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Integration</span>
          <select
            name="integrationType"
            defaultValue={campaign?.integrationType ?? "website"}
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="website">Website</option>
            <option value="shopify">Shopify</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Website (optional)</span>
          <input
            type="url"
            name="integrationUrl"
            defaultValue={campaign?.integrationUrl ?? ""}
            placeholder="https://example.com"
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-dark">Select categories to feature in this campaign</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm has-[:checked]:border-brand has-[:checked]:bg-brand-light"
            >
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                defaultChecked={campaign?.categories.includes(category.id)}
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isDraft" defaultChecked={campaign?.isDraft ?? true} />
        Save as draft
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
      >
        Save Campaign
      </button>
    </form>
  );
}
