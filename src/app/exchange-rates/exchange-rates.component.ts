import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Table} from 'primeng/table';
import {skip} from 'rxjs/operators';

import {Rate} from '../models/rate.model';
import * as ExchangeRatesActions from './store/exchange-rates.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html'
})
export class ExchangeRatesComponent implements OnInit {

  rates: Rate[] = [];
  tableIsLoading = true;
  previousDate: string = '';
  dateValue: Date | undefined;

  // @ts-ignore
  @ViewChild('ratesTable') ratesTable: Table;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {

    this.tableIsLoading = true;
    this.store.dispatch(ExchangeRatesActions.getExchangeRates());

    this.store.select('exchangeRates').pipe(skip(1)).subscribe((exchangeRates) => {
      this.rates = exchangeRates.rates[exchangeRates.selectedRates];
      this.tableIsLoading = false;
      this.previousDate = exchangeRates.selectedRates;
      this.dateValue = new Date(exchangeRates.selectedRates);
      this.clearRatingTable();
    });
  }

  calendarInputOnSelectHandler(event: any) {

    const date = new Date(event);
    const dateFormatted = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    this.tableIsLoading = true;
    this.store.dispatch(ExchangeRatesActions.getExchangeRatesByDate({
      effectiveDate: dateFormatted,
      previousEffectiveDate: this.previousDate
    }));
  }

  clearRatingTable() {
    if (this.ratesTable) {
      this.ratesTable.reset();
      this.ratesTable.clear();
      // reset data sorting
      this.rates = (this.rates || []).slice();
    }
  }
}
