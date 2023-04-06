import {createReducer, on} from '@ngrx/store';

import {Rate} from '../../models/rate.model';
import * as ExchangeRatesActions from './exchange-rates.actions';

export interface State {
  rates: {
    [date: string]: Rate[]
  }
  selectedRates: string
}

export const initialState: State = {
  rates: {},
  selectedRates: ''
};

export const exchangeRatesReducer = createReducer(
  initialState,
  on(ExchangeRatesActions.getExchangeRatesSuccess, (state, props) => {

    const newState = {...state};
    const newRates = {...newState.rates};

    newRates[props.effectiveDate] = props.rates;
    newState.rates = newRates;
    newState.selectedRates = props.effectiveDate;

    return newState;
  }),
  on(ExchangeRatesActions.getExchangeRatesCached, (state, props) => {

    return {
      ...state,
      selectedRates: props.effectiveDate
    };
  }),
  on(ExchangeRatesActions.getExchangeRatesFailure, (state, props) => {

    return {
      ...state,
      selectedRates: props.previousEffectiveDate
    };
  }),
);
