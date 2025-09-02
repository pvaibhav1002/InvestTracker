import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailRequest } from '../models/email.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'https://8080-ffcccaeabffbbdcbfebfaedaabcebeddbadd.premiumproject.examly.io/api/email';

  constructor(private http: HttpClient) {}

  // sendEmail(emailData: EmailRequest): Observable<string> {
  //   return this.http.post<string>(`${this.baseUrl}/send`, emailData);
  // }

  sendEmail(emailData: EmailRequest): Observable<string> {
    return this.http.post<string> (`${this.baseUrl}/send`, emailData, { responseType: 'text' as 'json' });
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
  sendInquiryResponse(to: string, name: string, response: string): Observable<string> {
    const emailRequest: EmailRequest = {
      to,
      subject: 'Your Investment Inquiry Has Been Reviewed',
      text: `Hello ${name},\n\nThank you for your inquiry. Our team has reviewed it and responded:\n\n"${response}"\n\nIf you have further questions, feel free to reach out.\n\nBest regards,\nInvestTrack Team`
    };
    return this.sendEmail(emailRequest);
  }
 
  
 
  sendPriceUpdateNotification(to: string, investmentName: string, newPrice: number): Observable<string> {
    const emailRequest: EmailRequest = {
      to,
      subject: 'Investment Price Updated',
      text: `Dear Investor,\n\nThe price of "${investmentName}" has been updated to ₹${newPrice}.\n\nPlease check your dashboard for details.\n\nBest regards,\nInvestTrack Team`
    };
    return this.sendEmail(emailRequest);
  }
}
