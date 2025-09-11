import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailRequest } from '../models/email.model';
import { Observable } from 'rxjs';
import { APP_URL } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private readonly http: HttpClient) {}
}
