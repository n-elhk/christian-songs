import { Pipe, PipeTransform } from '@angular/core';
import { ReadingEnum } from '../interfaces/mass';

@Pipe({
  name: 'readingType',
  pure: true,
  standalone: true,
})
export class ReadingTypePipe implements PipeTransform {
  public transform(type: ReadingEnum | undefined): string {
    switch (type) {
      case ReadingEnum.EVANGILE:
        return 'Évangile';

      case ReadingEnum.PSAUME:
        return 'Psaume';

      case ReadingEnum.lECTURE_1:
        return '1ère lecture';

      case ReadingEnum.lECTURE_2:
        return '2ème lecture';
    }
    return '';
  }
}
