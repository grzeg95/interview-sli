import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { THEME_SELECTOR, ThemeSelector } from "./app/theme-selector/theme-selector";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: THEME_SELECTOR,
    useValue: new ThemeSelector([
      {
        value: 'bootstrap4-dark-purple',
        label: 'Ciemny'
      },
      {
        value: 'bootstrap4-light-purple',
        label: 'Jasny'
      }
    ], 'bootstrap4-light-purple')
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
