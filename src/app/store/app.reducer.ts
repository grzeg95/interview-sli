import * as fromExchangeRates from '../exchange-rates/store/exchange-rates.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  exchangeRates: fromExchangeRates.State
}

export const appReducer: ActionReducerMap<AppState> = {
  exchangeRates: fromExchangeRates.exchangeRatesReducer
}
