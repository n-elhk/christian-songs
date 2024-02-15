import { Pipe, PipeTransform } from '@angular/core';
import { levenshteinDistance } from '../helpers/levenshtein';

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  public transform(items: string[], searchTerm: string): string[] {
    if (!items || !searchTerm) {
      return [];
    }

    const result = [];
    for (const title of items) {
      const item = getText(searchTerm, title);
      const match = searchWithSpellingErrors(
        searchTerm.toLowerCase(),
        item.toLowerCase(),
        3
      );

      const match2 = item.toLowerCase().includes(searchTerm.toLowerCase());
      if ((match || match2) && result.length < 20) {
        result.push(title);
      }
    }

    return result;
  }
}

function getText(text: string, motif: string): string {
  const textLength = text.length;
  const motifLength = motif.length;
  if (textLength < motifLength) {
    return motif.slice(0, motifLength - textLength);
  }
  return motif;
}

// Fonction de recherche de texte dans un tableau d'objets avec fautes d'orthographe
function searchWithSpellingErrors(
  query: string,
  title: string,
  tolerance: number
): string | null {
  const distance = levenshteinDistance(query, title);

  if (distance <= tolerance) {
    return title;
  }

  return null;
}
