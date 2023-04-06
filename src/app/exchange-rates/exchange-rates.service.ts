import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RateTable } from '../models/rate-table.model';
import { Rate } from '../models/rate.model';

@Injectable()
export class ExchangeRatesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getRateTable(): Observable<{
    rates: Rate[],
    effectiveDate: string
  }> {
    return this.http.get<RateTable[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').pipe(
      map((rateTables) => {

        return {
          rates: rateTables[0].rates,
          effectiveDate: rateTables[0].effectiveDate
        }
      }),
      catchError(() => {

        const date = new Date();
        const dateFormatted = date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        return of({
          rates: [],
          effectiveDate: dateFormatted
        })
      })
    );
  }

  getRateTableFromDate(date: string): Observable<{
    rates: Rate[],
    effectiveDate: string
  }> {
    return this.http.get<RateTable[]>(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`).pipe(
      map((rateTables) => {
        return {
          rates: rateTables[0].rates,
          effectiveDate: date
        }
      }),
      catchError((error) => {

        if (error.error === '404 NotFound - Not Found - Brak danych') {
          return of({
            rates: [],
            effectiveDate: date
          })
        }

        throw error;
      })
    );
  }
}
