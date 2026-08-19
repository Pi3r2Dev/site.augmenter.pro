/**
 * GSAP `from({ opacity: 0 })` sur le chapitre déjà visible au load
 * (index 0) retarde le LCP de 2 s+ — même piège que Framer Motion sur
 * les heroes bento. Les chapitres suivants s'animent au scroll.
 */
export function shouldAnimateChapterEntrance(chapterIndex: number): boolean {
  return chapterIndex > 0;
}
