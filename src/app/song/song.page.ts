import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../core/services/api/api.service';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ name() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      @defer (when song()) {
      <div class="lyrics" [innerText]="song()"></div>
      } @loading {
      <ion-item>
        <ion-label>Chargement</ion-label>
        <ion-spinner name="crescent"></ion-spinner>
      </ion-item>
      }
    </ion-content>`,
  styles: [
    `
      :host {
        .lyrics {
          margin: 1rem;
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export class SongPage {
  private readonly apiService = inject(ApiService);

  readonly name = input.required<string>();

  readonly song = computedAsync(() => this.apiService.getSong(this.name()));
}
