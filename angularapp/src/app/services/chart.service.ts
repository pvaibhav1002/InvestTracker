import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/global';

@Injectable({
  providedIn: 'root'
})

export class ChartService {
  constructor(private httptClient:HttpClient) { }

  getAdminConsoleData():Observable<any>{
    return this.httptClient.get<any>(`${APP_URL}/admin/console`);
  }
 
  getUserPortfolioData(userId:number):Observable<any>{
    console.log(userId)
    return this.httptClient.get<any>(`${APP_URL}/user/${userId}/portfolio`);
  }
}
 