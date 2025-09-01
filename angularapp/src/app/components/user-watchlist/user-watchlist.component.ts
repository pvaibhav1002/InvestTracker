import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';

@Component({
  selector: 'app-user-watchlist',
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.css']
})
export class UserWatchlistComponent implements OnInit {
  investments: Investment[] = [];

  constructor(private userwatchlistService: UserWatchlistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.userwatchlistService.getUserWatchlist(this.authService.getAuthenticatedUserId()).subscribe((data) => {
      this.investments = data;
    })
  }

}
