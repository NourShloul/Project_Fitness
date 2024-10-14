import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLService } from '../url/url.service';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  logedINuser = "";
  constructor(private http: HttpClient, private URLService: URLService) {
  }
  staticData = "https://localhost:7072/api";

  getProductDetails(id: any) {
    return this.http.get<any>(`${this.staticData}/Products/${id}`)
  }

  cartItem: any = [];
  cartItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cartItem); // اسناد داتا 
  cartItemObser = this.cartItemSubject.asObservable(); // ناخذ منه الداتا

  apiPost: any =
    {
      "productId": 0,
      "quantity": 0,
      "price": 0,
      "cartId": 0,
      "email": "string"
    }

  addToCart(data: any) {
    this.URLService.userEmail.subscribe(email => {
      this.logedINuser = email
      console.log('Email from another service:', email);
    });
    if (this.logedINuser == "") {
      var recode = this.cartItem.find((x: any) => x.productId == data.productId);
      if (recode) {
        recode.quantity += data.quantity
        this.cartItemSubject.next(this.cartItem); /// next UPDATES and we use it for behavior subject 

      } else {
        this.cartItem.push(data);
        this.cartItemSubject.next(this.cartItem);
      }
    }
    else {
      this.apiPost.productId = data.productId;
      this.apiPost.quantity = data.quantity;
      this.apiPost.price = data.price;
      this.apiPost.cartId = data.cartId;
      this.apiPost.email = this.logedINuser;

      this.addcartItemToDatabase(this.apiPost).subscribe((data) => { console.log(data) })


    }

    

  }

  addcartItemToDatabase(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/CartItems/addcartitem`, data)

  }

  addLocalTouser(email: any) {
    for (let i = 0; i < this.cartItem.length; i++) {
      console.log(this.cartItem[i]);

      let apiPost = {
        productId: this.cartItem[i].productId,
        quantity: this.cartItem[i].quantity,
        price: this.cartItem[i].price,
        cartId: this.cartItem[i].cartId,
        email: email
      };

      // Capture the index so we know which item to remove later
      let currentIndex = i;

      // Add cart item to the database
      this.addcartItemToDatabase(apiPost).subscribe(
        (data) => {
          console.log('Successfully added:', data);

          // Remove the item from the cart after successful API call
          this.cartItem.splice(currentIndex, 1);
        },
        (error) => {
          console.error('Error adding cart item:', error);
        }
      );
    }
  }





  increaseQ(id: any) {
    var product = this.cartItem.find((x: any) => x.productId == id)
    if (product) {
      product.quantity += 1;

      this.cartItemSubject.next(this.cartItem); /// next UPDATES and we use it for behavior subject 
    }
  }

  decreaseQ(id: any) {
    var product = this.cartItem.find((x: any) => x.productId == id)
    if (product) {
      product.quantity -= 1;

      this.cartItemSubject.next(this.cartItem); /// next UPDATES and we use it for behavior subject 
    }
  }

  deleteItem(id: any) {
    debugger;
    // Find the index of the item in the cart array
    const productIndex = this.cartItem.findIndex((x: any) => x.productId == id);

    // If the item is found, remove it from the array
    if (productIndex !== -1) {
      this.cartItem.splice(productIndex, 1);  // Remove the item from the array

      // Notify subscribers about the updated cart items
      this.cartItemSubject.next(this.cartItem); // Update the BehaviorSubject
    }
  }


  APIincreaseQ(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CartItems/increaseQuantity/${id}`)
  }
  APIdecreaseQ(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CartItems/decreaseQuantity/${id}`)
  }





  getUSER(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}Users/${id}`)
  }


  paypalCheckout(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/paymentTEST/checkout/${id}`)
  }
}
