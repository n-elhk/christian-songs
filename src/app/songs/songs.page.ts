import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SongService } from '../common/services/api/song/song.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TitleFilterPipe } from '../common/pipes/title-filter';
import { RouterLink } from '@angular/router';

@Component({
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-searchbar
          placeholder="Cherchez un chant"
          [formControl]="control"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      @for (option of chantsName() | titleFilter: searchTerm(); track option) {
        <ion-item [routerLink]="['../songs', option]">
          {{ option }}
        </ion-item>
      }
    </ion-content>
  `,
  styles: [
    `
      :host {
        ion-searchbar {
          padding-block: 15px;
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleFilterPipe, RouterLink, IonicModule, ReactiveFormsModule],
})
export class SongsPage {
  private readonly songService = inject(SongService);

  readonly control = new FormControl('', { nonNullable: true });

  private readonly searchTerm$ = this.control.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  readonly searchTerm = toSignal(this.searchTerm$, { initialValue: '' });

  readonly chantsName = signal(Array.from(this.songService.songConfigs.keys()));
}
