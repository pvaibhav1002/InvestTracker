import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvestmentInquiry } from '../models/investment-inquiry.model';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class InvestmentInquiryService {

  constructor(private httpClient:HttpClient) { }

  addInquiry(inquiry:InvestmentInquiry):Observable<InvestmentInquiry>{
    return this.httpClient.post<InvestmentInquiry>(`${APP_URL}/inquiries`,inquiry);
  }

  getAllInquiries():Observable<InvestmentInquiry[]>{
    return this.httpClient.get<InvestmentInquiry[]>(`${APP_URL}/inquiries`);
  }

  getInquiriesByUserId(userId:number):Observable<InvestmentInquiry[]>{
    return this.httpClient.get<InvestmentInquiry[]>(`${APP_URL}/inquiries/user/${userId}`);
  }

  updateInquiry(inquiryId:number, inquiry:InvestmentInquiry):Observable<InvestmentInquiry>{
    return this.httpClient.put<InvestmentInquiry>(`${APP_URL}/inquiries/${inquiryId}`,inquiry);
  }

  deleteInquiry(inquiryId:number):Observable<void>{
    return this.httpClient.delete<void>(`${APP_URL}/inquiries/${inquiryId}`);
  }
}
