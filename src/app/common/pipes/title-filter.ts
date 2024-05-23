import { Pipe, PipeTransform } from '@angular/core';
import { search } from '../helpers/search-algo';

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
    return search(titles, searchTerm);
  }
}

