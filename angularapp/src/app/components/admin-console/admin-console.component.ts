import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { BaseChartDirective, Label } from 'ng2-charts';

import { ChartService } from 'src/app/services/chart.service';
 
@Component({

  selector: 'app-admin-console',

  templateUrl: './admin-console.component.html',

  styleUrls: ['./admin-console.component.css']

})

export class AdminConsoleComponent implements OnInit {
  distribution: any;
  constructor(private chartDto: ChartService) { }

  distribution: any;

  constructor(private chartDto: ChartService) { }
 
  public TypeLabels: Label[] = [];

  public TypeData: number[] = [];
 
  public SectorLabels: Label[] = [];

  public SectorData: number[] = [];
 
  public CapSizeLabels: Label[] = [];

  public CapSizeData: number[] = [];
 
  public totalUsers: number = 0;

  public totalInvestments: number = 0;

  public totalInvestedAmount: number = 0;
 
  public userSummaries: any[] = [];
 
  public doughnutChartType: ChartType = 'doughnut';
 
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
 