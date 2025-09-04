import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { IonCardContent, IonCard, IonContent, IonLabel } from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';
import { CfIcon } from '../shared/icon';
import { MassesStore } from '../common/store/mass.store';
import { ReadingTypePipe } from '../common/pipes/reading-type.pipe';

@Component({
  template: `
    <ion-content [fullscreen]="true">
      @if (readings().length > 0) {
        <ion-card
          routerLink="lectures"
          [queryParams]="{ types: readingsType() }">
          <img
            aria-hidden="true"
            alt="Silhouette of mountains"
            src="/images/genesis-1.webp" />

          <ion-card-content>
            <div style="display: flex; align-items:center; gap:1rem">
              <cf-icon
                svgName="bible"
                slot="start"
                aria-hidden="true"></cf-icon>

              <ion-label color="dark">
                <h2>Lectures</h2>
                <p>{{ readings()[0].intro_lue }}</p>
              </ion-label>
            </div>
          </ion-card-content>
        </ion-card>
      }

      @if (evangile(); as evangileValue) {
        <ion-card
          routerLink="lectures"
          [queryParams]="{ types: [evangileValue.type] }">
          <ion-card-content>
            <div style="display: flex; align-items:center; gap:1rem">
              <cf-icon
                svgName="bible"
                slot="start"
                aria-hidden="true" />

              <ion-label color="dark">
                <h2>{{ evangileValue.type | readingType }}</h2>
                <p>{{ evangileValue.intro_lue }}</p>
              </ion-label>
            </div>
          </ion-card-content>
        </ion-card>
      }
    </ion-content>
  `,
  styles: `
    ion-item {
      --ion-item-background: transparent;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CfIcon, ReadingTypePipe, IonCardContent, IonCard, IonContent, IonLabel]
})
export class MassPage {
  private readonly massesStore = inject(MassesStore);

  readonly readings = this.massesStore.readings;

  readonly readingsType = computed(() =>
    this.massesStore.readings().map(({ type }) => type)
  );

  readonly evangile = this.massesStore.evangile;
}
