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
  watchlists: any[] = [];
  originalWatchlist: any[] = [];
  ascPrice: boolean = true;
  ascQuantity: boolean = true;
  types = ['All', 'Equity', 'Mutual Fund', 'ETF', 'Bond', 'Real Estate'];
  searchText: string = '';
  successMessage: string = "";
  constructor(private userwatchlistService: UserWatchlistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  refreshdata(){

  }

  loadWatchlist() {
    this.userwatchlistService.getUserWatchlist(this.authService.getAuthenticatedUserId()).subscribe((data) => {
      this.watchlists = data;
      this.originalWatchlist = data;
      console.log(data);
    })
  }

  deleteWatchlist(watchlistid: number) {
    this.userwatchlistService.deleteFromWatchlist(watchlistid).subscribe(() => {
      this.successMessage = "Deleted Successfully"
      this.originalWatchlist=this.originalWatchlist.filter(watch=>watch.id!=watchlistid);
      this.watchlists=this.originalWatchlist;
    })
  }

  filterByNameAndType() {
    this.watchlists = this.originalWatchlist;
    this.watchlists = this.watchlists.filter((invest) => {
      let a = invest.name.toLowerCase().includes(this.searchText.toLowerCase());
      let b = invest.type.toLowerCase().includes(this.searchText.toLowerCase());
      return a || b;
    })

  }

  filterByType(option: string) {
    this.watchlists = this.originalWatchlist;
    if (option == 'All') {
      this.watchlists = this.originalWatchlist;
    } else {
      this.watchlists = this.watchlists.filter((invest) => {
        return invest.type == option;
      })
    }
  }

  sortByQuantity() {
    if (this.ascQuantity) {
      this.watchlists.sort((a, b) => a.quantity - b.quantity);
    } else {
      this.watchlists.sort((a, b) => b.quantity - a.quantity);
    }
    this.ascQuantity = !this.ascQuantity;
  }

  sortByPrice() {
    if (this.ascPrice) {
      this.watchlists.sort((a, b) => a.price - b.price);
    } else {
      this.watchlists.sort((a, b) => b.price - a.price);
    }
    this.ascPrice = !this.ascPrice;
  }

}