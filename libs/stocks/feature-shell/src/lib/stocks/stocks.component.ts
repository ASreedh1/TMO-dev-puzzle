import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { TimePeriods, FormError } from '@coding-challenge/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  timePeriods = TimePeriods;
  formError = FormError;
  apiError: any;
  quotes$ = this.priceQuery.priceQueries$;
  error$ = this.priceQuery.error$;
  destroyed$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}

  ngOnInit() {
    this.stockLoad();
  }

  private stockLoad() {
    this.createStockPickerForm();
    this.error$.pipe(takeUntil(this.destroyed$)).subscribe((error: any) => {
      this.apiError = error;
    });
  }

  private createStockPickerForm() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.loadSymbol(symbol);
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
