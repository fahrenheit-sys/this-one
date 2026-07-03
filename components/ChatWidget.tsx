"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    WineQAIWidgetInstance?: unknown;
    WineQAI_Widget?: new (options: { key: string }) => unknown;
  }
}

const WIDGET_KEY = "n7kGKzdV0ZeyqmIg";

export default function ChatWidget() {
  const [src] = useState(() => `//dev.wineq.ai/web-widget/wineqai_widget.js?t=${Date.now()}`);

  return (
    <>
      <div id="wineqai-widget-container" />
      <Script
        src={src}
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window.WineQAIWidgetInstance === "undefined" && window.WineQAI_Widget) {
            window.WineQAIWidgetInstance = new window.WineQAI_Widget({ key: WIDGET_KEY });
          }
        }}
      />
    </>
  );
}
