import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

const MockPriceQueryFacade = {
  error$: of({
    value: 'error'
  }),
  fetchQuote: jest.fn(),
  loadSymbol: jest.fn()
};

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: MockPriceQueryFacade
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQuery = TestBed.get(PriceQueryFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call stockLoad()', () => {
    spyOn(component as any, 'stockLoad');
    component.ngOnInit();
    expect((component as any).stockLoad).toBeCalled();
  });

  it('should call createStockPickerForm()', () => {
    spyOn(component as any, 'createStockPickerForm');
    (component as any).stockLoad();
    expect((component as any).createStockPickerForm).toBeCalled();
  });

  it('should call fetchQuote()', () => {
    (component as any).stockPickerForm = formBuilder.group({
      symbol: 'AAPL',
      period: '5y'
    });
    spyOn((component as any).priceQuery, 'fetchQuote').and.returnValue(of({}));
    (component as any).fetchQuote();
    expect((component as any).priceQuery.fetchQuote).toBeCalled();
    expect((component as any).stockPickerForm.value.symbol).toEqual('AAPL');
    expect((component as any).stockPickerForm.value.period).toEqual('5y');
  });
});
