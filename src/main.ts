import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
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

if (environment.production) {
  enableProdMode();
}

function initializeIcon(
  iconRegistery: CfIconRegistery,
  domSanitizer: DomSanitizer
) {
  return () => {
    const baseSvg = 'assets/icon';

    const icons = [
      { name: 'bible', path: `${baseSvg}/bible.svg` },
    ];

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

    {
      provide: APP_INITIALIZER,
      useFactory: initializeSong,
      deps: [SongService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeIcon,
      deps: [CfIconRegistery, DomSanitizer],
      multi: true,
    },
    provideHttpClient(),
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
  ],
});
