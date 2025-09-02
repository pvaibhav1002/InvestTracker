import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailRequest } from '../models/email.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'https://8080-ddeffaffeacbfebfaedaabcebeddbadd.premiumproject.examly.io/api/email';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/send`, emailData);
  }

  sendFeedbackConfirmation(to: string, name: string): Observable<string> {
    const emailRequest = {
      to,
      subject: 'Feedback Submitted Successfully',
      text: `Dear ${name},\n\nThank you for your feedback. We appreciate your input and will review it shortly.\n\nBest regards,\nInvestTrack Team`
    };
    return this.sendEmail(emailRequest);
  }
  

  sendInquiryConfirmation(to: string, name: string): Observable<string> {
    const emailRequest: EmailRequest = {
      to,
      subject: 'Inquiry Submitted Successfully',
      text: `Dear ${name},\n\nThank you for your inquiry. We have received your request and will get back to you shortly.\n\nBest regards,\nInvestTrack Team`
    };
    return this.sendEmail(emailRequest);
  }
}
