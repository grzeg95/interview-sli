import { Rate } from './rate.model';

export interface RateTable {
  table: string,
  no: string,
  effectiveDate: string,
  rates: Rate[]
}
