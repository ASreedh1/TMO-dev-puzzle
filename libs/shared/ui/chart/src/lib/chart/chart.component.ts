import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { GoogleChart, handleChartOptions } from '@coding-challenge/util';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  @Input() chartOptions?: GoogleChart;

  constructor() {}

  ngOnInit() {
    this.chartOptions = handleChartOptions(this.chartOptions);
  }
}
