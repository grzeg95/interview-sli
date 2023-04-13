import { Inject, Injectable } from '@angular/core';
import {BehaviorSubject, defer} from 'rxjs';
import {THEME_SELECTOR, ThemeSelector} from "./theme-selector";

@Injectable()
export class ThemeSelectorService {

  theme$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    @Inject(THEME_SELECTOR) public themeSelector: ThemeSelector,
  ) {
    this.theme$.next(this.themeSelector.selectedThemeName);
  }

  setTheme(themeName: string) {
    return this.themeSelector.setTheme(themeName).then((theme) => {
      this.theme$.next(theme);
      return theme;
    }).catch((theme) => {
      return theme;
    })
  }

  getThemes() {
    return this.themeSelector.themes;
  }
}
