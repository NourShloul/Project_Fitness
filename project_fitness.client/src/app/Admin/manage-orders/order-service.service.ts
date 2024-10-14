import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Order {
  id: number;
  customerName: string;
  product: string;
  quantity: number;
  totalAmount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:7072/api/orders'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
