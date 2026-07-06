"use client";

import { useState } from "react";
import { CATEGORIES, TAXONOMY, getBandForScore, type CategoryId } from "@/lib/taxonomy";
import type { products } from "@/lib/db/schema";

type Product = typeof products.$inferSelect;
type AttributeValue = string | string[] | number;

export default function ProductForm({
  campaignId,
  campaignCategories,
  product,
  action,
}: {
  campaignId: string;
  campaignCategories: CategoryId[];
  product?: Product;
  action: (formData: FormData) => Promise<void>;
}) {
  const [category, setCategory] = useState<CategoryId>(
    (product?.category as CategoryId) ?? campaignCategories[0],
  );
  const [attributes, setAttributes] = useState<Record<string, AttributeValue>>(
    (product?.attributes as Record<string, AttributeValue>) ?? {},
  );

  const taxonomy = TAXONOMY[category];
  const categoryLabel = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

  function setSingle(questionId: string, value: string) {
    setAttributes((prev) => ({ ...prev, [questionId]: value }));
  }

  function toggleMulti(questionId: string, value: string, maxSelect?: number) {
    setAttributes((prev) => {
      const current = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      if (current.includes(value)) {
        return { ...prev, [questionId]: current.filter((v) => v !== value) };
      }
      if (maxSelect && current.length >= maxSelect) return prev;
      return { ...prev, [questionId]: [...current, value] };
    });
  }

  function setAxisScore(axisId: string, value: number) {
    setAttributes((prev) => ({ ...prev, [axisId]: value }));
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="campaignId" value={campaignId} />
      {product && <input type="hidden" name="productId" value={product.id} />}
      <input type="hidden" name="attributes" value={JSON.stringify(attributes)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Product name</span>
          <input
            type="text"
            name="name"
            required
            defaultValue={product?.name}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">SKU code</span>
          <input
            type="text"
            name="skuCode"
            required
            defaultValue={product?.skuCode}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Brand</span>
          <input
            type="text"
            name="brand"
            defaultValue={product?.brand ?? ""}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Category</span>
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as CategoryId);
              setAttributes({});
            }}
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          >
            {campaignCategories.map((id) => (
              <option key={id} value={id}>
                {categoryLabel(id)}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">RRP</span>
          <input
            type="number"
            name="rrp"
            min={0}
            step={0.01}
            required
            defaultValue={product ? product.rrpCents / 100 : undefined}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Wholesale price</span>
          <input
            type="number"
            name="wholesale"
            min={0}
            step={0.01}
            required
            defaultValue={product ? product.wholesaleCents / 100 : undefined}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Promotional rebate</span>
          <input
            type="number"
            name="promotionalRebate"
            min={0}
            step={0.01}
            defaultValue={product ? product.promotionalRebateCents / 100 : 0}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Product bias (%)</span>
          <input
            type="number"
            name="productBias"
            step={0.01}
            defaultValue={product?.productBiasPercent ?? 0}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Buy Now URL</span>
          <input
            type="url"
            name="buyNowUrl"
            required
            defaultValue={product?.buyNowUrl}
            placeholder="https://example.com/product/name"
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-brand-dark">Aisle / Bay location</span>
          <input
            type="text"
            name="aisleBayLocation"
            defaultValue={product?.aisleBayLocation ?? ""}
            placeholder="e.g. Aisle 4, Bay 14"
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-dark">Attributes</p>

        {taxonomy.kind === "choice" &&
          (taxonomy.questions.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              No question/attribute schema defined yet for this category.
            </p>
          ) : (
            <div className="mt-2 space-y-4">
              {taxonomy.questions.map((q) => (
                <div key={q.id}>
                  <p className="text-xs font-medium text-muted">{q.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const selected =
                        q.type === "multi"
                          ? Array.isArray(attributes[q.id]) &&
                            (attributes[q.id] as string[]).includes(opt.id)
                          : attributes[q.id] === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() =>
                            q.type === "multi"
                              ? toggleMulti(q.id, opt.id, q.maxSelect)
                              : setSingle(q.id, opt.id)
                          }
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                            selected
                              ? "border-brand bg-brand-light text-brand-dark"
                              : "border-black/10 text-muted hover:border-brand"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {taxonomy.kind === "survey" && (
          <div className="mt-2 space-y-4">
            <p className="text-xs text-muted">
              Specify one target score per axis — the customer&rsquo;s computed score is matched
              against these to rank recommendations, so be specific rather than claiming a broad
              fit.
            </p>
            {taxonomy.axes.map((axis) => {
              const axisMin = Math.min(...axis.bands.map((b) => b.min));
              const axisMax = Math.max(...axis.bands.map((b) => b.max));
              const value =
                typeof attributes[axis.id] === "number"
                  ? (attributes[axis.id] as number)
                  : Math.round((axisMin + axisMax) / 2);
              const band = getBandForScore(axis, value);
              return (
                <label key={axis.id} className="block text-sm">
                  <span className="font-medium text-brand-dark">{axis.label}</span>
                  <input
                    type="number"
                    min={axisMin}
                    max={axisMax}
                    required
                    value={value}
                    onChange={(e) => setAxisScore(axis.id, Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
                  />
                  {band && <span className="mt-1 block text-xs text-muted">{band.label}</span>}
                </label>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
      >
        Save Product
      </button>
    </form>
  );
}
