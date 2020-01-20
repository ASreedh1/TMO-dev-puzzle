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
import { transformDateRangeToTimePeriod } from './price-query-transformer.util';

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
                new PriceQueryFetched(this.filterPriceQueryResponse(
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

  /**
   * Filter the price query response
   * Fixes the chart issue if same from and to date selected
   * Since new Date and action.date give different date value for hh:mm:ss
   */
  private filterPriceQueryResponse(resp: any[], action: FetchPriceQuery) {
    return resp.filter(
      (data: PriceQueryResponse) =>
        (new Date(data.date) >= action.dateFrom &&
          new Date(data.date) <= action.dateTo) ||
        (new Date(data.date).toDateString() ===
          action.dateFrom.toDateString() &&
          new Date(data.date).toDateString() === action.dateTo.toDateString() &&
          action.dateFrom.toDateString() === action.dateTo.toDateString())
    );
  }
}
