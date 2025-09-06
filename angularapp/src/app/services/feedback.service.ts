import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
   
  constructor(private readonly httptClient:HttpClient) { }
 
  sendFeedback(feedback:Feedback):Observable<Feedback>{
    return this.httptClient.post<Feedback>(`${APP_URL}/feedback`,feedback);
  }

  getAllFeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.httptClient.get<Feedback[]>(`${APP_URL}/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId:number):Observable<void>{
    return this.httptClient.delete<void>(`${APP_URL}/feedback/${feedbackId}`);
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.httptClient.get<Feedback[]>(`${APP_URL}/feedback`);
  }


}
