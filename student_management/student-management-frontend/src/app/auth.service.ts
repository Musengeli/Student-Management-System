import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  send2FACode(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-2fa-code`, { email });
  }

  validate2FA(email: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/validate-2fa`, { email, code });
  }
}
