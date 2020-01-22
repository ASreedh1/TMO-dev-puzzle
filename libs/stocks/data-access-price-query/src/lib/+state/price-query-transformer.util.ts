import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse, differenceInYears } from 'date-fns';
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

export function transformDateRangeToTimePeriod(dateFrom: Date, dateTo: Date) {
  const dateToday = new Date();

  // if to date less than today's date, take difference between current date and date from
  if (dateTo < dateToday) {
    dateTo = dateToday;
  }

  const diffInYears = differenceInYears(dateTo, dateFrom);
  switch (true) {
    case diffInYears >= 5:
      return 'max';
    case diffInYears >= 2:
      return '5y';
    case diffInYears >= 1:
      return '2y';
    default:
      return '1y';
  }
}

export function filterPriceQueryResponse(resp: any[], action: FetchPriceQuery) {
  return resp.filter(
    (data: PriceQueryResponse) =>
      parse(data.date) >= parse(action.dateFrom) &&
      parse(data.date) <= parse(action.dateTo)
  );
}
