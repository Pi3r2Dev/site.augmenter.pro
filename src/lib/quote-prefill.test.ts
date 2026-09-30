import { afterEach, describe, expect, it } from "vitest";
import { prefillQuote, QUOTE_STORAGE_KEY } from "./quote-prefill";

/** Stockage mémoire pour tester `prefillQuote` hors navigateur. */
class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() {
    return this.data.size;
  }
  clear() {
    this.data.clear();
  }
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  key(index: number) {
    return [...this.data.keys()][index] ?? null;
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
}

const memory = new MemoryStorage();

function readPrefill() {
  const raw = memory.getItem(QUOTE_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

afterEach(() => {
  memory.clear();
  Reflect.deleteProperty(globalThis, "window");
});

describe("prefillQuote", () => {
  it("dépose le service et le contexte additionnel (porte du guide)", () => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: memory },
      configurable: true,
    });

    prefillQuote({
      service: "audit-180",
      additional: { porte: "chiffrage", guide: "ma-pme-en-2027" },
    });

    const saved = readPrefill();
    expect(saved.selectedServices).toEqual(["audit-180"]);
    expect(saved.context.additional).toEqual({
      porte: "chiffrage",
      guide: "ma-pme-en-2027",
    });
  });

  it("n'écrase pas une session déjà au-delà de l'étape 1", () => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: memory },
      configurable: true,
    });
    memory.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({
        step: 2,
        selectedServices: ["formation"],
        context: { additional: { porte: "ancienne" } },
      }),
    );

    prefillQuote({
      service: "audit-180",
      additional: { porte: "goulot" },
    });

    expect(readPrefill().selectedServices).toEqual(["formation"]);
    expect(readPrefill().context.additional.porte).toBe("ancienne");
  });

  it("à l'étape 1, le dernier CTA met à jour la porte sans perdre le reste", () => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: memory },
      configurable: true,
    });
    memory.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({
        step: 1,
        selectedServices: ["audit-180"],
        context: {
          sector: "BTP / Immobilier",
          additional: { sector_detail: "négoce" },
        },
      }),
    );

    prefillQuote({
      service: "formation",
      additional: { porte: "formation", guide: "ma-pme-en-2027" },
    });

    const saved = readPrefill();
    expect(saved.selectedServices).toEqual(["formation"]);
    expect(saved.context.sector).toBe("BTP / Immobilier");
    expect(saved.context.additional).toEqual({
      sector_detail: "négoce",
      porte: "formation",
      guide: "ma-pme-en-2027",
    });
  });
});
