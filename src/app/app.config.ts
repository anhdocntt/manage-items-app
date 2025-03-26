import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import SpinnerController from './core/controllers/spinner.controller';
import ToastController from './core/controllers/toast.controller';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { UrlInterceptor } from './core/interceptors/url.interceptor';
import { SpinnerService } from './core/services/spinner.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    provideHttpClient(),
    ToastController,
    SpinnerController,
    SpinnerService,
  ]
};
