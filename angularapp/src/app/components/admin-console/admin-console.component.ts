import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('doughnutChart', { static: false }) doughnutChart: BaseChartDirective;

  public doughnutChartLabels: Label[] = ['Download', 'In-Store', 'Mail-Order'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: ChartType = 'doughnut';

  

  // // Export the line chart as PNG
  // exportLineChartAsPNG() {
  //   // Chart.js exposes toBase64Image() on the chart instance
  //   const base64 = this.lineChart.chart.toBase64Image();
  //   const link = document.createElement('a');
  //   link.href = base64;
  //   link.download = 'line-chart.png';
  //   link.click();
  // }


}
