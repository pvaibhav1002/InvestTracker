import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})

export class AdminConsoleComponent implements OnInit {
  distribution: any;
  constructor(private readonly chartDto: ChartService) { }
  TypeLabels: Label[] = [];
  TypeData: number[] = [];
  SectorLabels: Label[] = [];
  SectorData: number[] = [];
  CapSizeLabels: Label[] = [];
  CapSizeData: number[] = [];
  totalUsers: number = 0;
  totalInvestments: number = 0;
  totalInvestedAmount: number = 0;
  userSummaries: any[] = [];
  doughnutChartType: ChartType = 'doughnut';

  doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        '#007bff', // Blue
        '#28a745', // Green
        '#17a2b8', // Teal
        '#ffc107', // Yellow
        '#dc3545', // Red
        '#6f42c1'  // Purple
      ]
    }
  ];

  ngOnInit() {
    this.chartDto.getAdminConsoleData().subscribe(data => {
      this.distribution = data;
      this.totalUsers = data.totalUsers;
      this.totalInvestments = data.totalInvestments;
      this.totalInvestedAmount = data.totalInvestedAmount;
      this.TypeLabels = Object.keys(this.distribution.distributionByType);
      this.TypeData = Object.values(this.distribution.distributionByType);
      this.SectorLabels = Object.keys(this.distribution.distributionBySector);
      this.SectorData = Object.values(this.distribution.distributionBySector);
      this.CapSizeLabels = Object.keys(this.distribution.distributionByCapSize);
      this.CapSizeData = Object.values(this.distribution.distributionByCapSize);
      this.userSummaries = data.userSummaries;
    });
  }
}