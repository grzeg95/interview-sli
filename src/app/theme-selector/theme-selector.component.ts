import { ChangeDetectorRef, Component } from '@angular/core';
import { ThemeSelectorService } from './theme-selector.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['theme-selector.component.scss']
})
export class ThemeSelectorComponent {

  themeOptions: {label: string, value: string}[] = [];

  theme: string;
  themeIsLoading = false;

  constructor(
    private themeSelectorService: ThemeSelectorService,
    private cdr: ChangeDetectorRef
  ) {
    this.themeOptions = this.themeSelectorService.themes;
    this.theme = this.themeSelectorService.selectedThemeName;
  }

  themeChangeHandler(event: {originalEvent: PointerEvent, value: string}) {

    this.themeIsLoading = true;
    this.cdr.detectChanges();

    this.themeSelectorService.setTheme(event.value).then((theme) => {
      this.themeIsLoading = false;
      this.theme = theme;
    });
  }
}
