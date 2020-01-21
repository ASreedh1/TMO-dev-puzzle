import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  StocksAppConfig,
  StocksAppConfigToken
} from '@coding-challenge/stocks/data-access-app-config';
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
import {
  transformDateRangeToTimePeriod,
  filterPriceQueryResponse
} from './price-query-transformer.util';

@Injectable()
export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery, state: PriceQueryPartialState) => {
        const period = transformDateRangeToTimePeriod(
          action.dateFrom,
          action.dateTo
        );
        return this.httpClient
          .get(
            `${this.env.apiURL}/beta/stock/${
              action.symbol
            }/chart/${period}?token=${this.env.apiKey}`
          )
          .pipe(
            map(
              (resp: any[]) =>
                new PriceQueryFetched(filterPriceQueryResponse(
                  resp,
                  action
                ) as PriceQueryResponse[])
            )
          );
      },

      onError: (action: FetchPriceQuery, error) => {
        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    @Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<PriceQueryPartialState>
  ) {}
}
