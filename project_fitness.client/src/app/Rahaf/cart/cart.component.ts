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
  logedINuser = "";
  userId: any;
  test = "";

  constructor(private cartService: CartService, private router: Router, private ProductService: ProductDetailsService, private URLService: URLService) {
  }

  ngOnInit(): void {
    this.URLService.emailaddressUser.subscribe(email => {
      this.logedINuser = email;
      this.test = email;
      
      console.log('Email from another service:', this.logedINuser);
      console.log('this is the test output', this.test);
    });

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('user ID from Cart:', this.userId);
    });

    if (this.userId != null) {
      this.getCartItemsUser()
    }

    // Fetch cart items when the component is initialized
    
    this.getCartItemsLocal()
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




  test555 : any
  incrimentQ(productId: any, id: any) {
    if (this.test == "") {
      this.ProductService.increaseQ(productId);
    } else {
      this.ProductService.APIincreaseQ(id).subscribe(
        (response) => {
          //console.log('Quantity increased:', response);
          //this.test555 = response.quantity
          //this.router.navigate(['/cart']); // Navigate after the API call is successful
          this.getCartItemsUser()
        },
        (error) => {
          console.error('Error increasing quantity:', error);
        }
      );
    }
  }

  minusQ(productId: any, id: any) {
    if (this.test == "") {
      this.ProductService.decreaseQ(productId);
    } else {
      this.ProductService.APIdecreaseQ(id).subscribe(
        (response) => {
          //console.log('Quantity increased:', response);
          //this.test555 = response.quantity
          //this.router.navigate(['/cart']); // Navigate after the API call is successful
          this.getCartItemsUser()
        },
        (error) => {
          console.error('Error increasing quantity:', error);
        }
      );
    }
  }


  remove(productId: any, id: any) {
    debugger;
    if (this.test == "") {
      this.ProductService.deleteItem(productId);
    } else {
      this.cartService.deleteCartItem(id).subscribe();
      //  this.router.navigate(['/cart']);
      this.getCartItemsUser()
    }
    
  }
}
