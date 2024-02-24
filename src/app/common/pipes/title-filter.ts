import { Pipe, PipeTransform } from '@angular/core';
import { levenshteinDistance } from '../helpers/levenshtein';

type DistanceResult = {
  distance: number;
  title: string;
};

@Pipe({
  name: 'titleFilter',
  pure: true,
  standalone: true,
})
export class TitleFilterPipe implements PipeTransform {
  public transform(titles: string[], searchTerm: string): string[] {
    if (!titles || !searchTerm) {
      return [];
    }

    const distances: DistanceResult[] = [];
    const result: string[] = [];

    for (const title of titles) {
      const truncatedTitle = getTruncatedTitle(searchTerm, title);
      const distance = searchWithSpellingErrors(
        searchTerm.toLowerCase(),
        truncatedTitle.toLowerCase(),
        4
      );

      const match =
        truncatedTitle.trim().toLowerCase() === searchTerm.trim().toLowerCase();
      // On commence par verifier s'il y a un match exact si oui on l'ajoute
      if (match) {
        distances.push({ distance: 0, title });
      } else if (distance) {
        distances.push({ distance, title });
      }
    }

    // Trier de la plus petite distance à la plus grande (du plus pertinent aux moins pertinents)
    const sortedDistances = distances.toSorted(
      (a, b) => a.distance - b.distance
    );

    for (const { title } of sortedDistances) {
      if (result.length < 20) {
        result.push(title);
      }
    }
    return result;
  }
}

function getTruncatedTitle(searchTerm: string, title: string): string {
  const searchTermLength = searchTerm.length;
  const motifLength = title.length;
  if (searchTermLength < motifLength) {
    return title.substring(0, searchTermLength);
  }
  return title;
}

function searchWithSpellingErrors(
  query: string,
  title: string,
  tolerance: number
) {
  const distance = levenshteinDistance(query, title);

  if (distance <= tolerance) {
    return distance;
  }

  return null;
}
