export type IMass = {
  informations: Information;
  messes: Mass[];
};

type Mass = {
  nom: string;
  lectures: Reading[];
};

type Reading = {
  type: ValuesOf<typeof ReadingEnum>;
  titre: string;
  contenu: string; // InnerHTML;
  ref: string;
  intro_lue: string | null;
  verset_evangile: InnerHTML;
  ref_verset: string;
};

type Information = {
  date: string;
  zone: string;
  couleur: string;
  annee: string;
  temps_liturgique: string;
  semaine: string;
  jour: string;
  jour_liturgique_nom: string;
  fete: string;
  degre: string;
  ligne1: string;
  ligne2: string;
  ligne3: string;
};

export const ReadingEnum = {
  LECTURE_1:'lecture_1',
  LECTURE_2: 'lecture_2',
  EVANGILE:'evangile',
  PSAUME:'psaume',
} as const

export type ValuesOf<T> = T[keyof T];
