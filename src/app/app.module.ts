import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AppComponent } from './app.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemeSelectorService } from './theme-selector/theme-selector.service';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SelectButtonModule
  ],
  providers: [
    ThemeSelectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
