import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PriceQueryHttpService {
  constructor(protected httpClient: HttpClient) {}

  public getStocksPrice(params: any): Observable<any> {
    return this.httpClient.get(
      `/api/v1.0/stocks/chart/${params.symbol}/${params.period}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
  }
}
