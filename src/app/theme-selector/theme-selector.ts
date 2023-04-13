import {InjectionToken} from "@angular/core";

export const THEME_SELECTOR = new InjectionToken<ThemeSelector>('ThemeSelector');

export type Theme = {
  value: string;
  label: string
}

export class ThemeSelector {

  _selectedThemeName: string = '';

  get selectedThemeName() {
    return this._selectedThemeName;
  }

  set selectedThemeName(selectedThemeName: string) {
    this._selectedThemeName = selectedThemeName;
  }

  constructor(
    readonly themes: Theme[],
    private defaultThemeName: string
  ) {
  }

  setStoredThemeOrDefault(): Promise<string> {
    const storedTheme = localStorage.getItem('theme') || '';

    if (!this.themes.find((_theme) => _theme.value === storedTheme)) {
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
        reject(this.selectedThemeName);
      };

      document.head.append(themeLink);
    });
  }
}
