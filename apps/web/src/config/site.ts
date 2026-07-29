import { createAbsoluteUrl, normalizeSiteUrl } from "@hooind/utils";
import type { Metadata } from "next";

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;

export const siteConfig = {
  name: "Hooind",
  applicationName: "Hooind Interactive",
  description: "설치 없이 바로 사용하는 재미있고 유용한 웹 계산기와 도구",
  url: siteUrl,
  operatorName: "Hooind Studio",
  contactEmail,
  locale: "ko_KR",
  language: "ko",
  openGraph: {
    type: "website" as const,
    locale: "ko_KR",
    siteName: "Hooind",
  },
};

export function getSiteUrl(path = "/") {
  return createAbsoluteUrl(siteConfig.url, path);
}

export function createPageMetadata({
  description,
  path,
  title,
}: {
  description: string;
  path: string;
  title: string;
}): Metadata {
  const canonical = getSiteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      ...siteConfig.openGraph,
      title,
      description,
      url: canonical,
    },
  };
}
