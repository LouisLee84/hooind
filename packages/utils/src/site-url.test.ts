import { describe, expect, it } from "vitest";
import { createAbsoluteUrl, normalizeSiteUrl } from "./site-url";

describe("site URL utilities", () => {
  it("uses the production default when the value is missing or invalid", () => {
    expect(normalizeSiteUrl(undefined)).toBe("https://hooind.com");
    expect(normalizeSiteUrl("not-a-url")).toBe("https://hooind.com");
    expect(normalizeSiteUrl("javascript:alert(1)")).toBe("https://hooind.com");
  });

  it("removes trailing slashes, query strings, and fragments", () => {
    expect(normalizeSiteUrl("https://example.com///?a=1#top")).toBe(
      "https://example.com",
    );
  });

  it("creates consistent absolute URLs without trailing slashes", () => {
    expect(createAbsoluteUrl("https://example.com/", "/")).toBe(
      "https://example.com",
    );
    expect(
      createAbsoluteUrl("https://example.com/", "/calculators/salary/"),
    ).toBe("https://example.com/calculators/salary");
  });
});
