import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Product {
  id?: number;
  categoryId: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7072/api'; // Adjust this to your actual API

  constructor(private http: HttpClient) { }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/Products`, product)
      .pipe(catchError(this.handleError));
  }

  // Update an existing product by ID
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/Products/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  // Fetch a single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/Products/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products`)
      .pipe(catchError(this.handleError));
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Products/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
