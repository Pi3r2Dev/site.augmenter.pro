"use client";

import { useEffect } from "react";
import { BackgroundCanvas } from "../approche/narrative/background-canvas";
import { SmoothScrollProvider } from "../approche/narrative/smooth-scroll-provider";
import { CustomCursor } from "../approche/narrative/custom-cursor";
import { NavFixed } from "../approche/narrative/nav-fixed";
import { ChapterRail } from "../approche/narrative/chapter-rail";
import { ProgressBar } from "../approche/narrative/progress-bar";
import { useMoodObserver } from "../approche/narrative/mood-observer";
import { narrativeStore } from "../approche/narrative/store";
import { HomeAbTracker } from "@/components/analytics/home-ab-tracker";
import { HOME_CHAPTERS } from "./home-moods";
import { H01Cover } from "./chapters/ch01-cover";
import { H02Constat } from "./chapters/ch02-constat";
import { H03Disciplines } from "./chapters/ch03-disciplines";
import { H04Preuves } from "./chapters/ch04-preuves";
import { H05Recit } from "./chapters/ch05-recit";
import { H06Suite } from "./chapters/ch06-suite";

export function HomeNarrative() {
  useMoodObserver(HOME_CHAPTERS);

  // Pont store → événement window pour le tracker A/B : relaie chaque
  // changement de chapitre actif sans re-render React.
  useEffect(() => {
    let last = -1;
    const unsubscribe = narrativeStore.subscribe(() => {
      const idx = narrativeStore.get().activeChapter;
      if (idx === last) return;
      last = idx;
      window.dispatchEvent(new CustomEvent("home:chapter", { detail: idx }));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <HomeAbTracker
        variant="home_narrative"
        totalChapters={HOME_CHAPTERS.length}
      />
      <BackgroundCanvas />
      <CustomCursor />
      <NavFixed />
      <ChapterRail chapters={HOME_CHAPTERS} />
      <ProgressBar chapters={HOME_CHAPTERS} />
      <main className="relative z-10">
        <H01Cover />
        <H02Constat />
        <H03Disciplines />
        <H04Preuves />
        <H05Recit />
        <H06Suite />
      </main>
    </SmoothScrollProvider>
  );
}
