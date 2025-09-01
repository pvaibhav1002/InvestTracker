import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_URL } from 'src/global';
import { Investment } from '../models/investment.model';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserWatchlistService { 
  constructor(private httpClient: HttpClient) { }

  getAllInvestments(): Observable<Investment[]> {
    return this.httpClient.get<Investment[]>(`${APP_URL}/investments`);
  }
 
  getUserWatchlist(userId:number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${APP_URL}/watchlist/${userId}`);
  }

  addToWatchlist(investmentId: number, userId:number): Observable<any> {
    let watchlist={"investment":{"investmentId":investmentId},"user-id":userId};
    return this.httpClient.post<any>(`${APP_URL}/watchlist`,watchlist);
  }

}
 