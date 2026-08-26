export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quelle différence entre l'Audit 180° et l'Audit 360° ?",
    answer:
      "L'Audit 180° est un échange de 60 minutes, non facturé, pour identifier les quick wins et poser un premier diagnostic. L'Audit 360° (550 €) est un diagnostic approfondi de ~3 heures qui inclut tout l'Audit 180° + une cartographie des cas d'usage IA, une analyse ROI et une feuille de route 6 mois.",
  },
  {
    question: "Le premier rendez-vous est-il payant ?",
    answer:
      "Non. Les 60 minutes ne sont pas facturées, à trois conditions : vous dirigez une PME ou vous êtes indépendant, vous avez un sujet précis — une tâche qui coince, un logiciel qui bloque — et vous comptez faire quelque chose de la réponse. Ce n'est pas un rendez-vous de découverte commerciale : on regarde vos outils, on nomme ce qui freine, et vous repartez avec deux ou trois pistes, que vous travailliez avec nous ensuite ou non. Si votre sujet sort de ce qu'on sait faire, on vous le dit dans les dix premières minutes.",
  },
  {
    question: "Qu'est-ce que l'expertise technique ?",
    answer:
      "On analyse votre infrastructure (hardware + logiciel) pour garantir une performance fiable à coût raisonnable. Diagnostic parc, réseaux, ERP/CRM, outils IA pertinents pour votre secteur.",
  },
  {
    question: "Comment optimisez-vous les processus ?",
    answer:
      "Cartographie de vos flux de travail (prospection → facturation), identification des tâches automatisables, mise en place d'outils et d'automatisations sans casser les habitudes existantes.",
  },
  {
    question: "L'approche humaine, ça veut dire quoi concrètement ?",
    answer:
      "Formations personnalisées, entretiens individuels, conduite du changement. Parce qu'un outil mal adopté = budget gâché. On travaille avec vos équipes, pas à leur place.",
  },
  {
    question: "Travaillez-vous hors 78/95 ?",
    answer:
      "En présentiel on privilégie Yvelines et Val d'Oise pour la proximité. À distance (visio), on intervient partout en France francophone.",
  },
];
