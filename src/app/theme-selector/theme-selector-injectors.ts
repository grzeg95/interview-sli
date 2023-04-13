import {InjectionToken} from '@angular/core';
import {ThemeConfig} from './theme-selector.model';

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('ThemeConfig');
