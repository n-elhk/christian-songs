import { enableProdMode, provideZonelessChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { DomSanitizer, bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { SongService } from './app/common/services/api/song/song.service';
import { CfIconRegistery } from './app/shared/icon';
import { provideIonicAngular } from '@ionic/angular/standalone';

if (environment.production) {
  enableProdMode();
}

function initializeIcon(
  iconRegistery: CfIconRegistery,
  domSanitizer: DomSanitizer
) {
  return () => {
    const baseSvg = '/icon';

    const icons = [{ name: 'bible', path: `${baseSvg}/bible.svg` }];

    icons.forEach(icon => {
      return iconRegistery.addSvgIcon(
        icon.name,
        domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  };
}

export function initializeSong(aelfService: SongService) {
  return () => {
    return aelfService.initializeSong();
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAppInitializer(() => {
      const initializerFn = (initializeSong)(inject(SongService));
      return initializerFn();
    }),
    provideAppInitializer(() => {
      const initializerFn = (initializeIcon)(inject(CfIconRegistery), inject(DomSanitizer));
      return initializerFn();
    }),
    provideHttpClient(),
    provideIonicAngular(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
  ],
});
