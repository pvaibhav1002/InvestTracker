import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment.model';
import { InvestmentService } from 'src/app/services/investment.service';
import { UserWatchlistService } from 'src/app/services/user-watchlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { timeout } from 'rxjs/operators';

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
  types = ['All', 'Equity', 'Mutual Fund', 'ETF', 'Bond', 'Real Estate'];
  searchText: string = '';
  showQuantityModal: boolean = false;


  showModal: boolean = false;
  selectedInvestment: Investment | null = null;
  buyQuantity: number=0;
  errorMessage: string = '';
  errorTimeout: any;
  successMessage: string = '';
  constructor(private readonly investmentService: InvestmentService, private readonly userwatchlistservice: UserWatchlistService, private readonly authservice: AuthService) { }

  ngOnInit(): void {
    this.getAllInvestments();
  }


  getAllInvestments() {
    this.investmentService.getAllInvestments().subscribe((data) => {
      this.investments = data;
      this.originalInvestments = data;
    })
  }


  openBuyModal(investment: Investment) {
    this.selectedInvestment = investment;
    this.errorMessage = '';
    this.successMessage = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedInvestment = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  confirmBuy() {
    if (!this.selectedInvestment || this.buyQuantity <= 0) {
      this.errorMessage = 'Please enter a valid quantity.';
      this.successMessage = '';
      clearTimeout(this.errorTimeout);
      this.errorTimeout = setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      return;
    }

    if (this.selectedInvestment.quantity < this.buyQuantity) {
      this.errorMessage = 'Buy quantity cannot exceed available quantity.';
      this.successMessage = '';
      clearTimeout(this.errorTimeout);
      this.errorTimeout = setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      return;
    }


    const userInvestment = {
      "quantityBought": this.buyQuantity,
      "purchasePrice": this.selectedInvestment.price,
      "user": {
        "userId": this.authservice.getAuthenticatedUserId()
      },
      "investment": {
        "investmentId": this.selectedInvestment.investmentId
      }
    };


    this.investmentService.buyInvestment(userInvestment).subscribe({
      next: () => {
        this.successMessage = 'Investment purchased successfully!';
        this.errorMessage = '';
        setTimeout(() => this.closeModal(), 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to purchase investment.';
        this.successMessage = '';
      }
    });
  }

  addToWatchlist(investmentId: number) {
    this.userwatchlistservice.addToWatchlist(investmentId, this.authservice.getAuthenticatedUserId()).subscribe({
      next: () => {
        this.successMessage = 'Investment added to watchlist!';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (err) => {
        this.errorMessage = 'Investment already in watchlist.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 5000);
      }
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