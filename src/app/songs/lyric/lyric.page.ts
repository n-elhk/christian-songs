import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonButtons, IonToolbar, IonHeader, IonContent, IonBackButton, IonTitle, IonLabel, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { SongService } from 'src/app/common/services/api/song/song.service';

@Component({
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ name() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
    <!-- @let songResourceValue = songResource(); -->
      @if(!songResource.isLoading() && songResource.hasValue()){
        <div class="lyrics" [innerText]="songResource.value()"></div>
      } @else if (songResource.isLoading()) {
        <ion-item>
          <ion-label>Chargement</ion-label>
          <ion-spinner name="crescent"></ion-spinner>
        </ion-item>
      } @else if (songResource.error()) {
        <ion-item>
          <ion-label>Oups une erreur s'est produite</ion-label>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonToolbar,
    IonHeader,
    IonContent,
    IonBackButton,
    IonTitle,
    IonLabel,
    IonSpinner,
    IonItem
  ]
})
export class LyricPage {
  private readonly songService = inject(SongService);
  readonly name = input.required<string>();
  readonly songResource = rxResource({
    request: () => ({ name: this.name() }),
    loader: ({ request }) => this.songService.getSong(request.name),
  });
}
