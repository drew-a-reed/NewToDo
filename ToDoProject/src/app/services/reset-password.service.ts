import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
// import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private baseUrlDev: string = 'https://localhost:7174/api/User';
  private baseUrl: string = 'https:taskeeperapi.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrlDev}/send-reset-email/${email}`, {
      email,
    });
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${this.baseUrlDev}/reset-password`,
      resetPasswordObj
    );
  }
}
