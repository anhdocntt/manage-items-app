import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import SpinnerController from './core/controllers/spinner.controller';
import ToastController from './core/controllers/toast.controller';
import { spinnerIntercept } from './core/interceptors/spinner.interceptor';
import { urlIntercept } from './core/interceptors/url.interceptor';
import { SpinnerService } from './core/services/spinner.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        urlIntercept,
        spinnerIntercept
      ])
    ),
    ToastController,
    SpinnerController,
    SpinnerService,
  ]
};
