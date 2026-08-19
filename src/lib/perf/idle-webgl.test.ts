import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DECORATIVE_MOTION_MAX_PX,
  IDLE_DEFER_TIMEOUT_MS,
  scheduleWhenIdle,
  shouldRunDecorativeMotion,
} from "./idle-webgl";

describe("shouldRunDecorativeMotion", () => {
  it("refuse prefers-reduced-motion même sur desktop", () => {
    expect(
      shouldRunDecorativeMotion({
        reducedMotion: true,
        saveData: false,
        viewportWidth: 1440,
      }),
    ).toBe(false);
  });

  it("refuse Save-Data", () => {
    expect(
      shouldRunDecorativeMotion({
        reducedMotion: false,
        saveData: true,
        viewportWidth: 1440,
      }),
    ).toBe(false);
  });

  it("refuse le viewport Lighthouse mobile (412 px)", () => {
    expect(
      shouldRunDecorativeMotion({
        reducedMotion: false,
        saveData: false,
        viewportWidth: 412,
      }),
    ).toBe(false);
  });

  it("refuse exactement le breakpoint max", () => {
    expect(
      shouldRunDecorativeMotion({
        reducedMotion: false,
        saveData: false,
        viewportWidth: DECORATIVE_MOTION_MAX_PX,
      }),
    ).toBe(false);
  });

  it("autorise un desktop sans contrainte", () => {
    expect(
      shouldRunDecorativeMotion({
        reducedMotion: false,
        saveData: false,
        viewportWidth: DECORATIVE_MOTION_MAX_PX + 1,
      }),
    ).toBe(true);
  });
});

describe("scheduleWhenIdle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("passe par requestIdleCallback quand il est fourni", () => {
    const callback = vi.fn();
    const cancelIdleCallback = vi.fn();
    const requestIdleCallback = vi.fn((cb: () => void) => {
      cb();
      return 11;
    });

    const cancel = scheduleWhenIdle(callback, 1_000, {
      requestIdleCallback,
      cancelIdleCallback,
      setTimeout: vi.fn(),
      clearTimeout: vi.fn(),
    });

    expect(requestIdleCallback).toHaveBeenCalledWith(callback, {
      timeout: 1_000,
    });
    expect(callback).toHaveBeenCalledOnce();
    cancel();
    expect(cancelIdleCallback).toHaveBeenCalledWith(11);
  });

  it("retombe sur setTimeout (Safari / Node) avec le timeout LCP", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const cancel = scheduleWhenIdle(callback);

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(IDLE_DEFER_TIMEOUT_MS - 1);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledOnce();
    cancel();
  });
});
