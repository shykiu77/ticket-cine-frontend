import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';  // Importa JWT_OPTIONS e JwtHelperService
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // Adiciona JWT_OPTIONS e JwtHelperService
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,  // Adiciona JwtHelperService como provider global
  ],
};
