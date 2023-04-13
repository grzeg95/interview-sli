import {Inject, Injectable} from '@angular/core';
import {Theme, ThemeConfig} from './theme-selector.model';
import {THEME_CONFIG} from './theme-selector-injectors';

@Injectable()
export class ThemeSelectorService {

  selectedThemeName: string = '';
  defaultThemeName: string;
  themes: Theme[];

  constructor(
    @Inject(THEME_CONFIG) themeConfig: ThemeConfig
  ) {
    this.defaultThemeName = themeConfig.defaultTheme;
    this.themes = themeConfig.themes;
  }

  setStoredThemeOrDefault(): Promise<string> {
    const storedTheme = localStorage.getItem('theme') || '';

    if (!this.themes.find((_theme) => _theme.value === storedTheme)) {

      if (!this.defaultThemeName) {
        return Promise.reject('Please provide default theme name');
      }

      return this.setTheme(this.defaultThemeName);
    }

    return this.setTheme(storedTheme);
  }

  setTheme(themeName: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      const theme = this.themes.find((_theme) => _theme.value === themeName) || '';

      const oldThemeLink = document.getElementById('app-theme') as HTMLLinkElement;
      const themeLink = document.createElement('link');

      if (!theme) {
        reject(this.selectedThemeName);
        return;
      }

      themeLink.id = 'app-theme';
      themeLink.rel = 'stylesheet';
      themeLink.type = 'text/css';
      themeLink.href = themeName + '.css';

      themeLink.onload = () => {
        localStorage.setItem('theme', themeName);

        if (oldThemeLink) {
          oldThemeLink.remove();
        }
        this.selectedThemeName = themeName;
        resolve(themeName);
      };

      themeLink.onerror = () => {
        themeLink.remove();
        localStorage.setItem('theme', this.selectedThemeName);
        reject(this.selectedThemeName);
      };

      document.head.append(themeLink);
    });
  }
}
