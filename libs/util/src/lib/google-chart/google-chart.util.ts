import { googleChartConstant } from './google-chart.constant';
import { GoogleChart } from './google-chart.type';

export function overrideChartOptions(chartOptions?: GoogleChart): GoogleChart {
  return {
    title: (chartOptions && chartOptions.title) || googleChartConstant.TITLE,
    type: (chartOptions && chartOptions.type) || googleChartConstant.TYPE,
    data: (chartOptions && chartOptions.data) || [],
    columnNames: (chartOptions && chartOptions.columnNames) || [
      googleChartConstant.COLUMN_NAMES.COLUMN1,
      googleChartConstant.COLUMN_NAMES.COLUMN2
    ],
    options: (chartOptions && chartOptions.options) || {
      title: googleChartConstant.OPTIONS.TITLE,
      width: googleChartConstant.OPTIONS.WIDTH,
      height: googleChartConstant.OPTIONS.HEIGHT
    }
  };
}
