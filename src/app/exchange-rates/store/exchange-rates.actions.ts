import {createAction, props} from '@ngrx/store';
import {Rate} from '../../models/rate.model';

export const getExchangeRates = createAction(
  '[Exchange rates] Get',
);

export const getExchangeRatesByDate = createAction(
  '[Exchange rates] Get By Date',
  props<{
    effectiveDate: string,
    previousEffectiveDate: string
  }>()
);

export const getExchangeRatesSuccess = createAction(
  '[Exchange rates] Get Success',
  props<{
    effectiveDate: string,
    rates: Rate[]
  }>()
);

export const getExchangeRatesCached = createAction(
  '[Exchange rates] Get Cached',
  props<{
    effectiveDate: string
  }>()
);

export const getExchangeRatesFailure = createAction(
  '[Exchange rates] Get Failure',
  props<{
    previousEffectiveDate: string
  }>()
);
