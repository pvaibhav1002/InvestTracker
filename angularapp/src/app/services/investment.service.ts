import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_URL } from 'src/global';
import { Investment } from '../models/investment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  
 
  constructor(private httpClient: HttpClient) { }

  getAllInvestments(): Observable<Investment[]> {
    return this.httpClient.get<Investment[]>(`${APP_URL}/investments`);
  }

  getInvestmentById(investmentId: number): Observable<Investment> {
    return this.httpClient.get<Investment>(`${APP_URL}/investments/${investmentId}`);
  }

  addInvestment(investment: Investment): Observable<Investment> {
    return this.httpClient.post<Investment>(`${APP_URL}/investments`, investment);
  }


  updateInvestment(id: number, data: Investment): Observable<Investment> {
    return this.httpClient.put<Investment>(`${APP_URL}/investments/${id}`, data);
  }


  deleteInvestment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${APP_URL}/investments/${id}`);
  }
 
}