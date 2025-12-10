import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { environment } from './environment';
import { reducers } from './store';
import { CountriesEffects } from './store/countries/countries.effects';
import { AuthEffects } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes),
    provideHttpClient(),
    
    provideStore(reducers),
    provideEffects([AuthEffects, CountriesEffects]),
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ]
};