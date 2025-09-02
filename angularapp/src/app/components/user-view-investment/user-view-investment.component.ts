import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment.model';
import { InvestmentService } from 'src/app/services/investment.service';
import { UserWatchlistComponent } from '../user-watchlist/user-watchlist.component';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view-investment',
  templateUrl: './user-view-investment.component.html',
  styleUrls: ['./user-view-investment.component.css']
})
export class UserViewInvestmentComponent implements OnInit {
  investments: Investment[];
  originalInvestments: Investment[];
  ascPrice: boolean = true;
  ascQuantity: boolean = true;
  types = ['All', 'Equity', 'Mutual Fund', 'Stocks', 'Crypto', 'Real Estate'];
  searchText: string = '';
  showQuantityModal: boolean = false;


  getAllInvestments() {
    this.investmentService.getAllInvestments().subscribe((data) => {
      this.investments = data;
      this.originalInvestments = data;
    })
  }

  constructor(private investmentService: InvestmentService, private userwatchlistservice: UserWatchlistService, private authservice: AuthService) { }

  addToWatchlist(investmentId: number) {
    this.userwatchlistservice.addToWatchlist(investmentId, this.authservice.getAuthenticatedUserId()).subscribe((data) => {
      console.log('Investment Added to Watchlist!');
    })
  }

  userController = {
    "user": {
      "userId": this.authservice.getAuthenticatedUserId()
    },
    "investment": {
      "investmentId": null
    },
    "quantityBought": null,
    "purchasePrice": null,
    "purchaseDate": null
  }

  buyInvestent(investmentId: number) {
    this.userController.investment.investmentId = investmentId;
    this.userController.quantityBought = 0; // reset default
    this.showQuantityModal = true;
  }

  closeModal() {
    this.showQuantityModal = false;
    this.userController.investment.investmentId = null;
  }

  confirmBuy() {
    if (this.userController.quantityBought <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }
    this.investmentService.buyInvestment(this.userController).subscribe(data => {
      console.log("Purchase successful", data);
      this.closeModal();
    });
  }


  ngOnInit(): void {
    this.getAllInvestments();
  }

  filterByNameAndType() {
    this.investments = this.originalInvestments;
    this.investments = this.investments.filter((invest) => {
      let a = invest.name.toLowerCase().includes(this.searchText.toLowerCase());
      let b = invest.type.toLowerCase().includes(this.searchText.toLowerCase());
      return a || b;
    })

  }

  filterByType(option: string) {
    this.investments = this.originalInvestments;
    if (option == 'All') {
      this.investments = this.originalInvestments;
    } else {
      this.investments = this.investments.filter((invest) => {
        return invest.type == option;
      })
    }
  }

  sortByQuantity() {
    if (this.ascQuantity) {
      this.investments.sort((a, b) => a.quantity - b.quantity);
    } else {
      this.investments.sort((a, b) => b.quantity - a.quantity);
    }
    this.ascQuantity = !this.ascQuantity;
  }

  sortByPrice() {
    if (this.ascPrice) {
      this.investments.sort((a, b) => a.price - b.price);
    } else {
      this.investments.sort((a, b) => b.price - a.price);
    }
    this.ascPrice = !this.ascPrice;
  }

}
