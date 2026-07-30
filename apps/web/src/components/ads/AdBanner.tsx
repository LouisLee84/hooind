"use client";

import { ADSENSE_SLOTS } from "@/config/ads";
import { useEffect, useRef } from "react";

type AdSenseQueue = Array<Record<string, never>>;

declare global {
  interface Window {
    adsbygoogle?: AdSenseQueue;
  }
}

export type AdBannerProps = Readonly<{
  slot: string;
  className?: string;
}>;

const adsenseClientId =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim().match(/^ca-pub-\d+$/)?.[0];
const isProduction = process.env.NODE_ENV === "production";
const placeholderLabels: Record<string, string> = {
  [ADSENSE_SLOTS.CALCULATOR_TOP]: "AdSense · Calculator Top",
  [ADSENSE_SLOTS.CALCULATOR_RESULT]: "AdSense · Calculator Result",
  [ADSENSE_SLOTS.CALCULATOR_BOTTOM]: "AdSense · Calculator Bottom",
};

/**
 * Renders a reusable responsive AdSense unit and queues one request per DOM node.
 */
export function AdBanner({ slot, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const normalizedSlot = slot.trim();
  const shouldLoadAd = isProduction && Boolean(adsenseClientId);
  const reservedHeightClass = className || "min-h-[100px] sm:min-h-[90px]";

  useEffect(() => {
    const adElement = adRef.current;

    if (
      !shouldLoadAd ||
      !normalizedSlot ||
      !adElement ||
      adElement.dataset.adRequestPushed === "true" ||
      adElement.hasAttribute("data-ad-status")
    ) {
      return;
    }

    adElement.dataset.adRequestPushed = "true";

    try {
      const queue = (window.adsbygoogle ??= [] as AdSenseQueue);
      queue.push({});
    } catch {
      // Keep the marker set so a vendor error cannot trigger duplicate requests.
    }
  }, [normalizedSlot, shouldLoadAd]);

  if (!isProduction) {
    return (
      <div
        className={`flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-5 text-center text-sm font-medium text-slate-500 ${reservedHeightClass}`}
        data-ad-placeholder
      >
        {placeholderLabels[normalizedSlot] ?? "AdSense"}
      </div>
    );
  }

  if (!adsenseClientId || !normalizedSlot) return null;

  return (
    <div className={`w-full overflow-hidden ${reservedHeightClass}`}>
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={adsenseClientId}
        data-ad-format="auto"
        data-ad-slot={normalizedSlot}
        data-full-width-responsive="true"
        key={normalizedSlot}
        ref={adRef}
        style={{ display: "block" }}
      />
    </div>
  );
}
