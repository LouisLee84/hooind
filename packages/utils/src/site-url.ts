const DEFAULT_SITE_URL = "https://hooind.com";

export function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim() || DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }

    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/+$/, "");

    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function createAbsoluteUrl(baseUrl: string, path = "/") {
  const normalizedBase = normalizeSiteUrl(baseUrl);
  const normalizedPath =
    path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;

  return `${normalizedBase}${normalizedPath}`;
}
