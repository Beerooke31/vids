import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDjVVwMCXtl4uem3sdKjIktHuvFwv1mkrw',
        authDomain: 'vidz-4ed4d.firebaseapp.com',
        projectId: 'vidz-4ed4d',
        storageBucket: 'vidz-4ed4d.firebasestorage.app',
        messagingSenderId: '976673690462',
        appId: '1:976673690462:web:8c2e613935c1630e16f5cf',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
