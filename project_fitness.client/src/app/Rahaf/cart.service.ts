import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7072/api/Carts';  

  constructor(private http: HttpClient) { }

 
  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId: product.id, quantity: 1 });
  }


  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }
}
