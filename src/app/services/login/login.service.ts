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
export class LoginService {
  // define our url
  url: any = 'http://localhost:4200/login';
  // handling errors
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  constructor(
    // pass httpclient  & router to constructor
    private http: HttpClient,
    private router: Router,
  ) { }

  // login function to handle response; get a token, means user is logged in. Save token to session storage to keep user logged in only during session
  login(Username: string, Password: string): any {
    this.http.post(this.url, { Username, Password }, httpOptions).toPromise().then((res: any) => {
      if (res && res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null); 
      } else if (res.Message) {
        // observe and respond with error message
        this.errorSubject.next(res.Message); 
      }
    });
  }
}
