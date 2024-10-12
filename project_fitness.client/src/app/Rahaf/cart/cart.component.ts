import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // Fetch cart items when the component is initialized
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items; // Assign fetched items to cartItems
      },
      (error) => {
        console.error('Error fetching cart items:', error); // Handle errors
      }
    );
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
    this.router.navigate(['/payment']); // Navigate to the payment route
  }
}
