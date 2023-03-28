import { Component, OnInit, ViewChild } from '@angular/core';
import { Rate } from '../models/rate.model';
import { ExchangeRatesService } from './exchange-rates.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html'
})
export class ExchangeRatesComponent implements OnInit {
  rates: Rate[] = [];
  tableIsLoading = true;

  // @ts-ignore
  @ViewChild('ratesTable') ratesTable: Table;

  constructor(
    private exchangeRatesService: ExchangeRatesService
  ) {
  }

  ngOnInit(): void {
    this.tableIsLoading = true;
    this.exchangeRatesService.getRateTable().subscribe((rateTable) => {
      this.handleNewRateTable(rateTable);
    });
  }

  calendarInputOnSelectHandler(event: any) {

    const date = new Date(event);
    const dateFormatted = date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    this.tableIsLoading = true;
    this.exchangeRatesService.getRateTableFromDate(dateFormatted).subscribe((rateTable) => {
      this.handleNewRateTable(rateTable);
    });
  }

  private handleNewRateTable(rates: Rate[]) {
    this.rates = rates;
    this.tableIsLoading = false;
    this.clearRatingTable();
  }

  clearRatingTable() {
    this.ratesTable.reset();
    this.ratesTable.clear();
    // reset data sorting
    this.rates = this.rates.slice();
  }
}
