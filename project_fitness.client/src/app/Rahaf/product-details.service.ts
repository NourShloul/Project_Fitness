import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7072/api";

  getProductDetails(id: any) {
    return this.http.get<any>(`${this.staticData}/Products/${id}`)
  }
}
