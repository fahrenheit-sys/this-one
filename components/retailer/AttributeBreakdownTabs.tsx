"use client";

import { useState } from "react";
import { TAXONOMY } from "@/lib/taxonomy";

function labelFor(questionId: string) {
  if (questionId === "category") return "Category";
  for (const category of Object.values(TAXONOMY)) {
    const question = category.questions.find((q) => q.id === questionId);
    if (question) return question.label;
  }
  return questionId;
}

// Kept as a plain object-values loop above rather than branching on `.kind` — both
// ChoiceTaxonomy and SurveyTaxonomy expose a `questions` array with an `id`/`label`,
// so the lookup works across both without needing to know which kind it is.

export default function AttributeBreakdownTabs({
  breakdown,
}: {
  breakdown: Record<string, { answer: string; count: number }[]>;
}) {
  const questionIds = Object.keys(breakdown);
  const [active, setActive] = useState(questionIds[0] ?? "");

  if (questionIds.length === 0) {
    return (
      <div className="rounded-xl border border-black/10 bg-white p-4">
        <p className="text-sm font-semibold text-brand-dark">Chat Questions and Answers</p>
        <p className="mt-3 text-sm text-muted">No data yet.</p>
      </div>
    );
  }

  const rows = breakdown[active] ?? [];

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="text-sm font-semibold text-brand-dark">Chat Questions and Answers</p>

      <div className="mt-3 flex flex-wrap gap-4 border-b border-black/5 text-sm">
        {questionIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`-mb-px border-b-2 pb-2 font-medium transition ${
              active === id ? "border-brand text-brand-dark" : "border-transparent text-muted"
            }`}
          >
            {labelFor(id)}
          </button>
        ))}
      </div>

      <table className="mt-3 w-full text-left text-sm">
        <thead className="text-xs uppercase text-muted">
          <tr>
            <th className="py-2">Answer</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.answer} className="border-t border-black/5">
              <td className="py-2">{row.answer}</td>
              <td className="py-2 text-right font-medium text-brand-dark">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
