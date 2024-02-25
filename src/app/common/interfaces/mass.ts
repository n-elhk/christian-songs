export type IMass = {
  informations: Information;
  messes: Mass[];
};

type Mass = {
  nom: string;
  lectures: Reading[];
};

type Reading = {
  type: ReadingEnum;
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

export enum ReadingEnum {
  lECTURE_1 = 'lecture_1',
  lECTURE_2 = 'lecture_2',
  EVANGILE = 'evangile',
  PSAUME = 'psaume',
}
