import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { MassesStore } from 'src/app/common/store/mass.store';
import { StripHtmlPipe } from '../../common/pipes/strip-html.pipe';
import { ReadingTypePipe } from '../../common/pipes/reading-type.pipe';

@Component({
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Lectures</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      @for (reading of readings(); track $index) {
        <div class="reading-item">
          <p class="intro">
            {{ reading.intro_lue ?? (reading.type | readingType) }}
          </p>
          <p>{{ reading.contenu | stripHtml }}</p>
        </div>
      }
    </ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .reading-item {
      padding: 1rem;
    }
    .intro {
      color: #ffcad4;
    }
  `,
  providers: [MassesStore],
  imports: [
    IonHeader,
    IonButtons,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonContent,
    StripHtmlPipe,
    ReadingTypePipe
  ]
})
export class ReadingPage {
  private readonly massesStore = inject(MassesStore);
  readonly readingTypes = injectQueryParams(
    param => param['types'] as string[]
  );

  readonly readings = computed(() => {
    const currentMass = this.massesStore.currentMass();
    if (currentMass) {
      return currentMass.messes[0].lectures.filter(lecture =>
        this.readingTypes().includes(lecture.type)
      );
    }
    return [];
  });
}
