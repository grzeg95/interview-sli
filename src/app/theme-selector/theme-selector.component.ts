import { Component } from '@angular/core';
import { Theme } from '../models/theme.model';
import { ThemeSelectorService } from './theme-selector.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['theme-selector.component.scss']
})
export class ThemeSelectorComponent {
  stateOptions: {label: string, value: string}[] = [
    {label: 'Ciemny', value: Theme.dark},
    {label: 'Jasny', value: Theme.light}
  ];

  constructor(
    private themeSelectorService: ThemeSelectorService
  ) {
  }

  themeChangeHandler(event: {originalEvent: PointerEvent, value: Theme}) {
    this.themeSelectorService.switchTheme(event.value);
  }
}
