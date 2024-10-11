import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7072/api/Carts';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Add product to cart (backend will handle adding/updating items)
  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId: product.id, quantity: 1 });
  }

  // Get all cart items from the backend
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }

  // Remove product from cart on the backend
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }
}
