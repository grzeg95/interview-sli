import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {AppComponent} from './app.component';
import {ExchangeRatesComponent} from './exchange-rates/exchange-rates.component';
import {ExchangeRatesService} from './exchange-rates/exchange-rates.service';
import {ExchangeRatesEffects} from './exchange-rates/store/exchange-rates.effects';
import {ThemeSelectorComponent} from './theme-selector/theme-selector.component';
import * as fromApp from './store/app.reducer';
import {environment} from '../environments/environment';
import {ThemeSelectorModule} from "./theme-selector/theme-selector.module";

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    ThemeSelectorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule,
    DialogModule,
    EffectsModule.forRoot([ExchangeRatesEffects]),
    FormsModule,
    HttpClientModule,
    SelectButtonModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    TableModule,
    ToastModule,
    ThemeSelectorModule.forRoot({
      themes: [
        {
          value: 'bootstrap4-dark-purple',
          label: 'Ciemny'
        },
        {
          value: 'bootstrap4-light-purple',
          label: 'Jasny'
        }
      ],
      defaultTheme: 'bootstrap4-light-purple'
    })
  ],
  providers: [
    ExchangeRatesService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
