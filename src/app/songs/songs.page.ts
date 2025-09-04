import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SongService } from '../common/services/api/song/song.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { searchWithFuse } from '../common/functions/fuse';

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
      @for (song of songFiltered(); track song.title) {
        <ion-item [routerLink]="['../songs', song.title]">
          {{ song.title }}
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IonicModule, ReactiveFormsModule]
})
export class SongsPage {
  private readonly songService = inject(SongService);

  readonly control = new FormControl('', { nonNullable: true });

  private readonly songFiltered$ = this.control.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map((searchTerm) => searchWithFuse(this.chantsName, { searchTerm, maxResults: 20 }, ['title'])),
  );

  readonly songFiltered = toSignal(this.songFiltered$, { initialValue: [] });

  readonly chantsName = Array.from(this.songService.songConfigs.keys()).map((title) => ({ title }));
}
