export enum TimePeriods {
  'All available data' = 'max',
  'Five years' = '5y',
  'Two years' = '2y',
  'One year' = '1y',
  'Year-to-date' = 'ytd',
  'Six months' = '6m',
  'Three months' = '3m',
  'One month' = '1m'
}

export enum FormError {
  symbol = 'Please enter a symbol',
  period = 'Please select a favorite time period',
  apiError = 'Error in API response'
}
