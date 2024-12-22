import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  APP_INITIALIZER,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import UserEffects from './store/user/user.effects';
import { catchError, firstValueFrom, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../types';
import { isPlatformBrowser } from '@angular/common';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AppInitService } from './app.init';

const appInitializer = (appInit: AppInitService) => () => appInit.init();

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AppInitService],
      multi: true,
    },
  ],
};
