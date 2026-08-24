export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quelle différence entre l'Audit 180° et l'Audit 360° ?",
    answer:
      "L'Audit 180° est un échange de 60 minutes, offert, pour identifier les quick wins et poser un premier diagnostic. L'Audit 360° (550 €) est un diagnostic approfondi de ~3 heures qui inclut tout l'Audit 180° + une cartographie des cas d'usage IA, une analyse ROI et une feuille de route 6 mois.",
  },
  {
    question: "Le diagnostic de 60 minutes est-il vraiment offert ?",
    answer:
      "Oui, sans engagement. Objectif : vérifier qu'on est alignés avant toute prestation payante. Si le fit n'est pas là, on vous oriente ailleurs — c'est aussi ça un bon diagnostic.",
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
