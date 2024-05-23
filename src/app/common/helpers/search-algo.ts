import { levenshteinDistance } from './levenshtein';

const getLevenshteinSuggestions = <T>(toleranceMax = 5) => {
  const obj: Record<number, T[]> = {};
  for (let index = 0; index < toleranceMax; index++) {
    Object.assign(obj, { [index]: [] });
  }
  return obj;
};

export const search = (array: string[], searchTerm: string, maxResult = 20) => {
  const levenshteinSuggestions = getLevenshteinSuggestions<string>();
  const suggestions: string[] = [];
  const trimSearchString = removeAccents(searchTerm.toLowerCase().trim());
  let i = 0;

  do {
    const item = array[i];
    const itemToCompare = removeAccents(array[i].trim().toLowerCase());
    if (itemToCompare === trimSearchString) {
      suggestions.unshift(item);
    } else if (itemToCompare.includes(trimSearchString)) {
      suggestions.push(item);
    } else {
      const score = levenshteinDistance(trimSearchString, itemToCompare);
      const distanceMax = itemToCompare.length <= 4 ? 3 : 4;
      if (score <= distanceMax) {
        levenshteinSuggestions[score].push(item);
      }
    }
    i++;
  } while (suggestions.length < maxResult && i < array.length);

  return [...suggestions, ...concatAllArrays(levenshteinSuggestions)].slice(
    0,
    maxResult
  );
};

const concatAllArrays = <T>(obj: Record<number, T[]>) => {
  return Object.values(obj).reduce((acc, curr) => acc.concat(curr), []);
};

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
