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

  getRateTable(): Observable<Rate[]> {
    return this.http.get<RateTable[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').pipe(
      map((rateTables) => {
        return rateTables[0].rates;
      }),
      catchError(() => {
        return of([])
      })
    );
  }

  getRateTableFromDate(date: string): Observable<Rate[]> {
    return this.http.get<RateTable[]>(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`).pipe(
      map((rateTables) => {
        return rateTables[0].rates;
      }),
      catchError(() => {
        return of([])
      })
    );
  }
}
