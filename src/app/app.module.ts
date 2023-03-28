import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { ExchangeRatesService } from './exchange-rates/exchange-rates.service';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemeSelectorService } from './theme-selector/theme-selector.service';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSelectorComponent,
    ExchangeRatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SelectButtonModule,
    TableModule,
    CalendarModule,
    DialogModule
  ],
  providers: [
    ThemeSelectorService,
    ExchangeRatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
