import { describe, expect, it } from "vitest";
import {
  buildApexCanonicalUrl,
  isWwwHost,
} from "./canonical-host";

describe("isWwwHost", () => {
  it("détecte www sans port", () => {
    expect(isWwwHost("www.augmenter.pro")).toBe(true);
  });

  it("détecte www avec le port interne Hostinger", () => {
    expect(isWwwHost("www.augmenter.pro:3000")).toBe(true);
  });

  it("ignore la casse", () => {
    expect(isWwwHost("WWW.augmenter.pro")).toBe(true);
  });

  it("laisse l'apex tel quel", () => {
    expect(isWwwHost("augmenter.pro")).toBe(false);
    expect(isWwwHost("augmenter.pro:3000")).toBe(false);
  });
});

describe("buildApexCanonicalUrl", () => {
  it("retire www et le port interne 3000 (bug GSC du 2026-08-16)", () => {
    const canonical = buildApexCanonicalUrl(
      "https://www.augmenter.pro:3000/",
      "www.augmenter.pro:3000",
    );
    expect(canonical.href).toBe("https://augmenter.pro/");
  });

  it("conserve le chemin et la query", () => {
    const canonical = buildApexCanonicalUrl(
      "https://www.augmenter.pro:3000/blog/nis2-pme-yvelines-val-doise?utm=gsc",
      "www.augmenter.pro",
    );
    expect(canonical.href).toBe(
      "https://augmenter.pro/blog/nis2-pme-yvelines-val-doise?utm=gsc",
    );
  });

  it("force https même si l'URL interne est http", () => {
    const canonical = buildApexCanonicalUrl(
      "http://www.augmenter.pro:3000/contact",
      "www.augmenter.pro:3000",
    );
    expect(canonical.protocol).toBe("https:");
    expect(canonical.href).toBe("https://augmenter.pro/contact");
  });
});
