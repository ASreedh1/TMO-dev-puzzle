import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { subYears } from 'date-fns';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  date = {
    minFromDate: subYears(new Date(), 5), // since API support to take only 5 years back data (non-paid)
    maxFromDate: new Date(),
    minToDate: subYears(new Date(), 5),
    maxToDate: new Date()
  };
  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}

  ngOnInit() {
    this.stockLoad();
  }

  private stockLoad() {
    this.createStockPickerForm();
  }

  private createStockPickerForm() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    });
  }

  public resetDate(): void {
    const dateFrom = this.stockPickerForm.controls.dateFrom;
    const dateTo = this.stockPickerForm.controls.dateTo;
    if (dateFrom.value && dateTo.value && dateFrom.value > dateTo.value) {
      dateTo.patchValue(dateFrom.value);
    }
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, dateFrom, dateTo } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, dateFrom, dateTo);
    }
  }
}
