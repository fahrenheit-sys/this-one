import Link from "next/link";
import { deleteProduct } from "@/app/retailer/campaigns/[id]/products/actions";
import type { products } from "@/lib/db/schema";

type Product = typeof products.$inferSelect;

function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductTable({
  campaignId,
  products: productRows,
}: {
  campaignId: string;
  products: Product[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-black/10 text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">RRP</th>
            <th className="px-4 py-3">Wholesale</th>
            <th className="px-4 py-3">Margin</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {productRows.map((product) => (
            <tr key={product.id} className="border-b border-black/5 last:border-0">
              <td className="px-4 py-3 font-medium text-brand-dark">{product.name}</td>
              <td className="px-4 py-3 text-muted">{product.skuCode}</td>
              <td className="px-4 py-3">{formatCurrency(product.rrpCents)}</td>
              <td className="px-4 py-3">{formatCurrency(product.wholesaleCents)}</td>
              <td className="px-4 py-3 font-semibold text-brand-dark">
                {formatCurrency(product.marginCents ?? 0)}
              </td>
              <td className="px-4 py-3 text-muted">{product.aisleBayLocation}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/retailer/campaigns/${campaignId}/products/${product.id}`}
                    className="rounded-md bg-brand-dark px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="campaignId" value={campaignId} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {productRows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-muted">
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
