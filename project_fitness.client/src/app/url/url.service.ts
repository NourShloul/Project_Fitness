import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.email.asObservable();
  constructor(private http: HttpClient) { }


  staticData = "https://localhost:7072/api";

  register(data: any): Observable<any> {
    return this.http.post(`https://localhost:7072/api/registeruser/register`, data)
  }




  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/registeruser/LOGIN`, data)
  }
}
