import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable()
export class ThemeSelectorService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  switchTheme(theme: Theme) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    themeLink.href = theme + '.css';
  }
}
