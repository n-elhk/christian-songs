import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  pure: true,
  standalone: true,
})
export class StripHtmlPipe implements PipeTransform {
  public transform(html: string): string {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
