import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  isAdmin: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.isAdmin.asObservable();

  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddressUser = this.userEmail.asObservable();
  userId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdmm = this.userId.asObservable();
  constructor(private http: HttpClient) { }


  staticData = "https://localhost:7072/api";

  register(data: any): Observable<any> {
    return this.http.post(`https://localhost:7072/api/registeruser/register`, data)
  }




  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/registeruser/LOGIN`, data)
  }
 



  GetTypeOfRecipe(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Recipe/Nutrition/GetAllRescipe`);
  }


  getSubRecipe(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeByRecipeId/${id}`);
  }
  getSubRecipeDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeById/${id}`);
  }

  GetAllGyms(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllGym`);
  }

  GetAllFitness(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllFitnessClass`);
  }
  getGymDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetGymById/${id}`)
  }
  getClassDetails(id: any): Observable<any>{
    debugger
    return this.http.get<any>(`${this.staticData}/Admin/GetClassById/${id}`)
  }
  GetAllTips(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Tips/Nutrition/GetAllTips`);
  }

  getTestimonial(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/`)
  }

  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/AOQContact/AddContact`, data)
  }
}
