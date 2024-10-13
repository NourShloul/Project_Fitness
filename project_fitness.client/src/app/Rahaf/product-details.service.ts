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
    this.URLService.emailaddress.subscribe(email => {
      debugger;
      this.logedINuser = email
      console.log('Email from another service:', email);
    });
    this.logedINuser = "ayah@gmail.com"
    debugger;
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
}
