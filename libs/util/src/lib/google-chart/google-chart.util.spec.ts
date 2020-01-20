import { handleChartOptions } from './google-chart.util';

describe('shared-util-google-chart', () => {
  it('getGoogleChartOptions gives default values', () => {
    const chartOptions = handleChartOptions();

    expect(chartOptions.title).toEqual('');
    expect(chartOptions.data).toEqual([]);
    expect(chartOptions.type).toEqual('LineChart');
  });

  it('getGoogleChartOptions gives values of chartOptions', () => {
    const options = {
      type: 'PieChart',
      title: 'Some'
    };
    const chartOptions = handleChartOptions(options);

    expect(chartOptions.title).toEqual('Some');
    expect(chartOptions.data).toEqual([]);
    expect(chartOptions.type).toEqual('PieChart');
  });
});
