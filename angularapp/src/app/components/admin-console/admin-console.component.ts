import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { PdfExportService } from 'src/app/services/pdf-export.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  distribution: any;

  TypeLabels: Label[] = [];
  TypeData: number[] = [];
  SectorLabels: Label[] = [];
  SectorData: number[] = [];
  CapSizeLabels: Label[] = [];
  CapSizeData: number[] = [];

  totalUsers = 0;
  totalInvestments = 0;
  totalInvestedAmount = 0;
  userSummaries: any[] = [];

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        '#00bce6',
        '#2962ff',
        '#d500f9',
        '#4dd0e1',
        '#7c4dff',
        '#1a237e'
      ],
      borderColor: '#0e1218',
      borderWidth: 2,
    }
  ];

  @ViewChild('typeChart') typeChart!: BaseChartDirective;
  @ViewChild('sectorChart') sectorChart!: BaseChartDirective;
  @ViewChild('capSizeChart') capSizeChart!: BaseChartDirective;

  constructor(
    private readonly chartDto: ChartService,
    private readonly pdfExport: PdfExportService
  ) {}

  ngOnInit() {
    this.chartDto.getAdminConsoleData().subscribe(data => {
      this.distribution = data;

      this.totalUsers = data.totalUsers;
      this.totalInvestments = data.totalInvestments;
      this.totalInvestedAmount = data.totalInvestedAmount;

      this.TypeLabels = Object.keys(data.distributionByType);
      this.TypeData = Object.values(data.distributionByType);

      this.SectorLabels = Object.keys(data.distributionBySector);
      this.SectorData = Object.values(data.distributionBySector);

      this.CapSizeLabels = Object.keys(data.distributionByCapSize);
      this.CapSizeData = Object.values(data.distributionByCapSize);
      this.userSummaries = data.userSummaries;
    });
  }

  downloadPDF() {
      const adminConsoleData = {
        totalUsers: this.totalUsers,
        totalInvestments: this.totalInvestments,
        totalInvestedAmount: this.totalInvestedAmount,
        userSummaries: this.userSummaries
      };

      this.pdfExport.exportAdminConsole(adminConsoleData);
  }
}