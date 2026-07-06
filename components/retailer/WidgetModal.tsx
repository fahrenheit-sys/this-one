"use client";

import { useState } from "react";

function buildSnippet(publicKey: string) {
  return `<div id="thisone-widget-container"></div>
<script type="text/javascript">
  (function (w) {
    var script = document.createElement("script");
    script.setAttribute("async", "async");
    script.setAttribute("src", "https://thisone.ai/api/widget.js?t=" + new Date().getTime());
    script.setAttribute("type", "text/javascript");
    script.onload = function () {
      w.ThisOneWidgetInstance = new ThisOneWidget({ key: "${publicKey}" });
    };
    document.head.appendChild(script);
  })(window);
</script>`;
}

export default function WidgetModal({ publicKey }: { publicKey: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const snippet = buildSnippet(publicKey);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-brand-dark px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
      >
        Widget
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-dark">Widget</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted">
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-brand-dark">Website Widget Code</p>
            <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-surface p-3 text-xs">{snippet}</pre>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(snippet);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="mt-4 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
