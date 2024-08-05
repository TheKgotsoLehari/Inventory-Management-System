import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import{routes} from './app.routes'
import { provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    // provideAnimationsAsync(),
    importProvidersFrom(
      MatDialogModule,
      MatButtonModule,
      ReactiveFormsModule,
      CommonModule, BrowserAnimationsModule,MatSidenavModule,HttpClient)
    ]
};