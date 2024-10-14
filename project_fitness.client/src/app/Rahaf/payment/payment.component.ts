import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../product-details.service';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Correct spelling here
})
export class PaymentComponent {
  cartItems: any[] = [];
  logedINuser = "";
  userId: any;
  test = "";

  constructor(private cartService: CartService, private router: Router, private ProductService: ProductDetailsService, private URLService: URLService) {
  }

  ngOnInit(): void {
    this.URLService.emailaddressUser.subscribe(email => {
      this.logedINuser = email;
      this.test = email;

    });

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
    });


      this.getCartItemsUser()

    this.getuser(this.userId)


  }

  getCartItemsUser() {
    this.cartService.getCartItems(this.userId).subscribe(
      (items) => {
        this.cartItems = items; // Assign fetched items to cartItems
      },
      (error) => {
        console.error('Error fetching cart items:', error); // Handle errors
      }
    );
  }

  // Calculate the total price of the items in the cart
  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  userDATA: any
  getuser(id: any) {
    debugger;
    this.ProductService.getUSER(id).subscribe((data) =>
      this.userDATA = data
    )
    console.log( "user data " + this.userDATA)
  }

}
