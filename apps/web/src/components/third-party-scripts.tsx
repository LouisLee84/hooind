import Script from "next/script";

const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim().match(/^G-[A-Z0-9]+$/)?.[0];
const adsenseClientId =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim().match(/^ca-pub-\d+$/)?.[0];
const isProduction = process.env.NODE_ENV === "production";

export function ThirdPartyScripts() {
  const shouldLoadGa = isProduction && Boolean(gaMeasurementId);
  const shouldLoadAdsense = isProduction && Boolean(adsenseClientId);

  if (!shouldLoadGa && !shouldLoadAdsense) return null;

  return (
    <>
      {shouldLoadGa && gaMeasurementId && (
        <>
          <Script
            id="google-analytics-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(gaMeasurementId)});
            `}
          </Script>
        </>
      )}
      {shouldLoadAdsense && adsenseClientId && (
        <Script
          crossOrigin="anonymous"
          id="google-adsense-loader"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClientId)}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
