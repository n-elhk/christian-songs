import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './app/core/services/api/api.service';

if (environment.production) {
  enableProdMode();
}

export function initializeSong(aelfService: ApiService) {
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
      deps: [ApiService],
      multi: true,
    },
    provideHttpClient(),
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes, withComponentInputBinding()),
  ],
});
