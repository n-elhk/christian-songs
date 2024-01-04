import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../core/services/api/api.service';
import { tap } from 'rxjs';

@Component({
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="lyrics" [innerText]="song()"></div>
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
export class SongPage implements OnInit {
  private readonly apiService = inject(ApiService);

  @Input() name?: string;

  public song = signal('');

  public ngOnInit(): void {
    if (this.name) {
      this.apiService
        .getChant(this.name)
        .pipe(tap((song) => this.song.set(song)))
        .subscribe();
    }
  }
}
