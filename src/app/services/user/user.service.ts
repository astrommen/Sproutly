import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// defining part of our API request
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // define our url
  url: any = 'http://localhost:4200/api';
  // handling errors
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(
    // pass httpclient  & router to constructor
    private http: HttpClient,
    private router: Router,
  ) { }

  // login function to handle response; get a token, means user is logged in. Save token to session storage to keep user logged in only during session
  login(Username: string, Password: string): any {
    this.http.post(`${this.url}login`, { Username, Password }, httpOptions).toPromise().then((res: any) => {
      if (res && res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null); 
        // after logging in redirect user to dashboard
        if (res.data) {
          this.userSubject.next(res.data);
        }
        this.router.navigateByUrl('dashboard');
      } else if (res.Message) {
        // observe and respond with error message
        this.errorSubject.next(res.Message); 
      }
    });
  }

  register(Username: string, Email: string, Password: string): any {
    this.http.post(`${this.url}register`, { Username, Email, Password }).toPromise().then((res: any) => {
      if(res & res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null);
        if(res.data) {
          this.userSubject.next(res.data);
        }
        this.router.navigateByUrl('dashboard');
      } else if (res.Message) {
        this.errorSubject.next(res.Message);
      }
    });
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('jwt')){
      return true;
    } else {
      return false;
    }
  }
}
