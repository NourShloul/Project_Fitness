import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7072/api";



  GetTypeOfRecipe(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Recipe/Nutrition/GetAllRescipe`);
  }


  getSubRecipe(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeByRecipeId/${id}`);
  }
  getSubRecipeDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeById/${id}`);
  }
}
