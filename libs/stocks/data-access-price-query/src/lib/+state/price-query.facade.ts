import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery, SelectSymbol } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import {
  getSelectedSymbol,
  getAllPriceQueries,
  getPriceQueryError
} from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );
  error$ = this.store.pipe(
    select(getPriceQueryError),
    skip(1)
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, period: string) {
    this.store.dispatch(new FetchPriceQuery(symbol, period));
  }

  loadSymbol(symbol: string) {
    this.store.dispatch(new SelectSymbol(symbol));
  }
}
