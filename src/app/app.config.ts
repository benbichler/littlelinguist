import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-1236f',
        appId: '1:1059238954258:web:4bd85aaaab30a4b553dfcb',
        storageBucket: 'little-linguist-1236f.appspot.com',
        apiKey: 'AIzaSyAquK-On98FdXgbVs1tPIhi3W9bP82aiII',
        authDomain: 'little-linguist-1236f.firebaseapp.com',
        messagingSenderId: '1059238954258',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
