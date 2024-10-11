import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items; 
      },
      (error) => {
        console.error('Error fetching cart items:', error); // Handle error
      }
    );
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.id).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id); 
      },
      (error) => {
        console.error('Error removing item from cart:', error); // Handle error
      }
    );
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  goToPayment(): void {
  }
}
