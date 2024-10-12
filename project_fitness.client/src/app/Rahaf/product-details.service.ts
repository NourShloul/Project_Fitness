import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLService } from '../url/url.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  logedINuser:any
  constructor(private http: HttpClient, private URLService: URLService) {
    this.URLService.emailaddress.subscribe(email => {
      this.logedINuser = email
      console.log('Email from another service:', email);
    });
  }
  staticData = "https://localhost:7072/api";

  getProductDetails(id: any) {
    return this.http.get<any>(`${this.staticData}/Products/${id}`)
  }

  cartItem: any = [];
  cartItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cartItem); // اسناد داتا 
  cartItemObser = this.cartItemSubject.asObservable(); // ناخذ منه الداتا

  addToCart(data: any) {
    if (this.logedINuser == "") {
      debugger;
      var recode = this.cartItem.find((x: any) => x.productId == data.productId);
      if (recode) {
        alert("product already exist")
      } else {
        this.cartItem.push(data);
        this.cartItemSubject.next(this.cartItem);
      }
    }
    else {

    }


  }
}
