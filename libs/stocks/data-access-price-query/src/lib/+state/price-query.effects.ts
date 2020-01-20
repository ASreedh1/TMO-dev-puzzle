import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import {
  FetchPriceQuery,
  PriceQueryActionTypes,
  PriceQueryFetched,
  PriceQueryFetchError
} from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { PriceQueryResponse } from './price-query.type';
import { PriceQueryHttpService } from '../service/price-query-http.service';

@Injectable()
export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery, state: PriceQueryPartialState) => {
        return this.priceQueryHttpService
          .getStocksPrice({
            symbol: action.symbol,
            period: action.period
          })
          .pipe(
            map(resp => new PriceQueryFetched(resp as PriceQueryResponse[]))
          );
      },

      onError: (action: FetchPriceQuery, error) => {
        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    private dataPersistence: DataPersistence<PriceQueryPartialState>,
    private readonly priceQueryHttpService: PriceQueryHttpService
  ) {}
}
