import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  constructor() { }


  totalFeedbacks: number = 0;
  totalInquiries: number = 0;
  totalInvestments: number = 0;
  unresolvedInquiries: number = 0;
  highPriorityInquiries: number = 0;


  ngOnInit(): void {
  }

}
