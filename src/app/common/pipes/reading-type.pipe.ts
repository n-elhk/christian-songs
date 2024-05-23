import { Pipe, PipeTransform } from '@angular/core';
import { ReadingEnum, ValuesOf } from '../interfaces/mass';

@Pipe({
  name: 'readingType',
  pure: true,
  standalone: true,
})
export class ReadingTypePipe implements PipeTransform {
  public transform(type: ValuesOf<typeof ReadingEnum> | undefined): string {
    switch (type) {
      case ReadingEnum.EVANGILE:
        return 'Évangile';

      case ReadingEnum.PSAUME:
        return 'Psaume';

      case ReadingEnum.LECTURE_1:
        return '1ère lecture';

      case ReadingEnum.LECTURE_2:
        return '2ème lecture';
    }
    return '';
  }
}
