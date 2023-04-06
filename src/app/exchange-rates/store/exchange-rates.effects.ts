import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as ExchangeRatesActions from './exchange-rates.actions';
import {ExchangeRatesService} from '../exchange-rates.service';

@Injectable()
export class ExchangeRatesEffects {

  getRateTableFromDate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ExchangeRatesActions.getExchangeRatesByDate),
        withLatestFrom(this.store$),
        exhaustMap(([action, storeState]) => {

          if (storeState.exchangeRates.rates[action.effectiveDate]) {
            return of(ExchangeRatesActions.getExchangeRatesCached({
              effectiveDate: action.effectiveDate,
            }))
          }

          return this.exchangeRatesService.getRateTableFromDate(action.effectiveDate).pipe(
            map((payload) => ExchangeRatesActions.getExchangeRatesSuccess({
              effectiveDate: action.effectiveDate,
              rates: payload.rates
            })),
            catchError(() => {
              return of(ExchangeRatesActions.getExchangeRatesFailure({
                previousEffectiveDate: action.previousEffectiveDate
              }))
            })
          )
        })
      )
  )

  getRateTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ExchangeRatesActions.getExchangeRates),
        exhaustMap((action) => {
          return this.exchangeRatesService.getRateTable().pipe(
            map((payload) => ExchangeRatesActions.getExchangeRatesSuccess({
              effectiveDate: payload.effectiveDate,
              rates: payload.rates
            }))
          )
        })
      )
  )

  constructor(
    private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private exchangeRatesService: ExchangeRatesService
  ) {
  }
}
