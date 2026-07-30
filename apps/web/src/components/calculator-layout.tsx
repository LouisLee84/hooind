import {
  CalculatorLayout as CalculatorLayoutBase,
  type CalculatorLayoutProps as CalculatorLayoutBaseProps,
} from "@hooind/ui";
import { AdBanner } from "@/components/ads/AdBanner";
import { ADSENSE_SLOTS } from "@/config/ads";

export type AdLayout = "full" | "compact" | "tool" | "none";

export type CalculatorLayoutProps = Omit<
  CalculatorLayoutBaseProps,
  "calculatorBottomAd" | "resultAd" | "topAd"
> & {
  adLayout?: AdLayout;
};

const adLayoutPolicy: Record<
  AdLayout,
  Readonly<{ bottom: boolean; result: boolean; top: boolean }>
> = {
  full: { top: true, result: true, bottom: true },
  compact: { top: true, result: true, bottom: false },
  tool: { top: true, result: false, bottom: true },
  none: { top: false, result: false, bottom: false },
};

/**
 * Applies the shared Hooind AdSense policy to calculator and tool pages.
 */
export function CalculatorLayout({
  adLayout = "full",
  ...layoutProps
}: CalculatorLayoutProps) {
  const policy = adLayoutPolicy[adLayout];

  return (
    <CalculatorLayoutBase
      {...layoutProps}
      calculatorBottomAd={
        policy.bottom ? (
          <AdBanner
            className="min-h-[100px] sm:min-h-[90px]"
            slot={ADSENSE_SLOTS.CALCULATOR_BOTTOM}
          />
        ) : undefined
      }
      resultAd={
        policy.result ? (
          <AdBanner
            className="min-h-[250px] sm:min-h-[280px]"
            slot={ADSENSE_SLOTS.CALCULATOR_RESULT}
          />
        ) : undefined
      }
      topAd={
        policy.top ? (
          <AdBanner
            className="min-h-[100px] sm:min-h-[90px]"
            slot={ADSENSE_SLOTS.CALCULATOR_TOP}
          />
        ) : undefined
      }
    />
  );
}
