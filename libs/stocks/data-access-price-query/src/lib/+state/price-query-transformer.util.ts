import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import { FetchPriceQuery } from './price-query.actions';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}

export const timePeriod = {
  MAX: 'max'
};

export function filterPriceQueryResponse(resp: any[], action: FetchPriceQuery) {
  return resp.filter(
    (data: PriceQueryResponse) =>
      parse(data.date) >= parse(action.dateFrom) &&
      parse(data.date) <= parse(action.dateTo)
  );
}
