import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse, differenceInMonths, differenceInYears } from 'date-fns';
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

/**
 * Since API doesn't support dates, transform the dates to periods available in API
 */
export function transformDateRangeToTimePeriod(dateFrom: Date, dateTo: Date) {
  const diffInYears = differenceInYears(dateTo, dateFrom);
  switch (true) {
    case diffInYears >= 5:
      return 'max';
    case diffInYears >= 2:
      return '5y';
    case diffInYears >= 1:
      return '2y';
    case diffInYears > 0:
      return '1y';
  }

  const diffInMonths = differenceInMonths(dateTo, dateFrom);
  switch (true) {
    case diffInMonths >= 1:
      return '3m';
    case diffInMonths >= 3:
      return '6m';
    case diffInMonths >= 6:
      return '1y';
    default:
      return '1m';
  }
}

export function filterPriceQueryResponse(resp: any[], action: FetchPriceQuery) {
  return resp.filter(
    (data: PriceQueryResponse) =>
      parse(data.date) >= parse(action.dateFrom) &&
      parse(data.date) <= parse(action.dateTo)
  );
}
