import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductDetailsService } from '../product-details.service';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  logedINuser: any;
  userId: any;

  constructor(private cartService: CartService, private router: Router, private ProductService: ProductDetailsService, private URLService: URLService) {
    this.URLService.emailaddress.subscribe(email => {
      this.logedINuser = email
      console.log('Email from another service:', this.logedINuser);
    });
  }

  ngOnInit(): void {
    this.URLService.emailaddress.subscribe(email => {
      this.logedINuser = email
      console.log('Email from another service:', this.logedINuser);
    });

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('Email from another service:', this.userId);
    });

    if (this.userId != null) {
      this.cartService.getCartItems(this.userId).subscribe(
        (items) => {
          this.cartItems = items; // Assign fetched items to cartItems
        },
        (error) => {
          console.error('Error fetching cart items:', error); // Handle errors
        }
      );
    }

    // Fetch cart items when the component is initialized
    
    this.getCartItemsLocal()
  }

  getCartItemsLocal() {
    this.ProductService.cartItemObser.subscribe((data) =>
      this.cartItems = data
    )
  }

  // Remove an item from the cart
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.id).subscribe(
      () => {
        // Filter the cartItems to remove the deleted item and update the view
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      },
      (error) => {
        console.error('Error removing item from cart:', error); // Handle errors
      }
    );
  }

  // Calculate the total price of the items in the cart
  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Navigate to the payment page
  goToPayment(): void {
    if (this.logedINuser == "") {
      this.router.navigate(['/Login']); // Navigate to the payment route
    } else {
      this.router.navigate(['/payment']);
    }
     // Navigate to the payment route
  }
}
