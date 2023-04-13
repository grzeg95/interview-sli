import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {ThemeConfig} from './theme-selector.model';
import {THEME_CONFIG} from "./theme-selector-injectors";
import {ThemeSelectorService} from "./theme-selector.service";

function initializeApp(themeSelectorService: ThemeSelectorService): () => Promise<any> {
  return () => Promise.all([
    themeSelectorService.setStoredThemeOrDefault()
  ]);
}

@NgModule({})
export class ThemeSelectorModule {
  static forRoot(themeConfig: ThemeConfig): ModuleWithProviders<ThemeSelectorModule> {
    return {
      ngModule: ThemeSelectorModule,
      providers: [
        ThemeSelectorService,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          multi: true,
          deps: [ThemeSelectorService]
        },
        {
          provide: THEME_CONFIG,
          useValue: themeConfig
        }
      ]
    }
  }
}
