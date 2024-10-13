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
  AddRecipeTaype(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Recipe/Nutrition/CreateRecipe`, data)
  }
  UpdateRecipe(id: any, data: any): Observable<any> {
    return this.http.put(`https://localhost:7130/api/Recipe/Nutrition/UpdateRecipe/${id}`, data)
  }

  deletrecipe(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Recipe/Nutritiom/DeleteRecipe/${id}`)
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


  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/AOQContact/AddContact`, data)
  }

  //updateService(id: any, data: any): Observable<any> {
  //  return this.http.put(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  //}
  GetTestimonial(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Testimonial/GetAllTestimonialsByNew`);
  
  }

  updateService(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  }

  //////////// Admin Gym APIs ///////////////////

  addGym(data: any): Observable<any> {

    return this.http.post<any>(`${this.staticData}/Admin/AddNewGym`, data)

  }
  PUTgym(id: any, data: any): Observable<any> {
    debugger
    return this.http.put<any>(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  }
  deletgym(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Admin/DeletGymById/${id}`)
  }
  //////////// Admin Fitness Class APIs ///////////////////
  addfitnessclass(data: any): Observable<any> {

    return this.http.post<any>(`${this.staticData}/Admin/AddNewFitnessClass`, data)

  }
  PUTfitnessclass(id: any, data: any): Observable<any> {

    return this.http.put<any>(`${this.staticData}/Admin/UpdateFitnessClassById/${id}`, data)
  }
  deletfitnessclass(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Admin/DeleteFitnessClassById/${id}`)
  }



}
