import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ThemeSelectorService } from './theme-selector.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnDestroy {

  themeOptions: {label: string, value: string}[] = [];

  theme: any;
  themeIsLoading: boolean = false;

  themeSub: Subscription | undefined;

  constructor(
    private themeSelectorService: ThemeSelectorService,
    private cdr: ChangeDetectorRef
  ) {
    this.themeOptions = this.themeSelectorService.getThemes();

    this.themeSub = this.themeSelectorService.theme$.subscribe((theme) => {
      if (theme) {
        this.theme = theme;
      }
    });
  }

  themeChangeHandler(event: {originalEvent: PointerEvent, value: string}) {

    this.themeIsLoading = true;
    this.cdr.detectChanges();

    this.themeSelectorService.setTheme(event.value).then(() => {
      this.themeIsLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }
}
