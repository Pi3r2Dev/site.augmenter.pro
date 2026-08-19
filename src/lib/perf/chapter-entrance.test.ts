import { describe, expect, it } from "vitest";
import { shouldAnimateChapterEntrance } from "./chapter-entrance";

describe("shouldAnimateChapterEntrance", () => {
  it("refuse le chapitre 0 déjà dans le viewport (LCP)", () => {
    expect(shouldAnimateChapterEntrance(0)).toBe(false);
  });

  it("autorise les chapitres suivants (entrée au scroll)", () => {
    expect(shouldAnimateChapterEntrance(1)).toBe(true);
    expect(shouldAnimateChapterEntrance(5)).toBe(true);
  });
});
