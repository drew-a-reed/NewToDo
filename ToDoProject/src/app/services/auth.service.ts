import { TokenApiModel } from '../models/token-api.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';
import { catchError, Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrlDev: string = "https://localhost:7174/api/User/";
  private baseUrl: string = 'https://taskeeperapi.azurewebsites.net/api/User/';
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
   }

  signUp(userObj:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrlDev}register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrlDev}authenticate`, loginObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue);
  }

  storeUserId(tokenValue: string){
    localStorage.setItem('userId', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  getUserId(){
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrlDev}refresh`, tokenApi);
  }
}
