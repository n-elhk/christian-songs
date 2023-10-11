import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  public transform(
    items: string[],
    searchTerm: string,
  ): { result: string[]; total: number } {
    if (!items || !searchTerm) {
      return { result: [], total: items.length };
    }

    const result = [];
    let total = 0;
    for (const item of items) {
      const match = item.toLowerCase().includes(searchTerm.toLowerCase());

      if (match && result.length < 20) {
        result.push(item);
        total += 1;
      }
    }

    return { result, total };
  }
}
