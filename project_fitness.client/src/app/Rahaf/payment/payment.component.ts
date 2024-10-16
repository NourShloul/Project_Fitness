import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../product-details.service';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2';

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

  // Calculate the total price of the items in the cart
  getCartTotalPLUS5(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity) + 5, 0);
  }

  userDATA: any = {};  // Change to an object instead of an array

  getuser(id: any) {
    this.ProductService.getUSER(id).subscribe((data) => {
      this.userDATA = data;
      console.log("User data: ", this.userDATA); // Log inside the subscription
    });
  }

  selectedPayment: string = '';

  PayPalCheck() {
    if (this.selectedPayment == "cash") {
      this.ProductService.cashCheckout(this.userId).subscribe((data) => {
        Swal.fire({
          icon: "success",
          title: "Order Placed Successfully!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.router.navigate(['/']);  // Navigate to the home route after alert
        });

      },
        (error) => {
          Swal.fire({
            icon: "warning",
            title: `${error.error}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
      
    } else {
      this.ProductService.paypalCheckout(this.userId).subscribe(
        (data) => {
          const width = 600;
          const height = 700;
          const left = (screen.width / 2) - (width / 2);
          const top = (screen.height / 2) - (height / 2);

          const popupWindow = window.open(
            data.approvalUrl,
            'PayPal Payment',
            `width=${width}, height=${height}, top=${top}, scrollbars=yes, resizable=yes`
          );

          const checkWindowClosed = setInterval(() => {
            if (popupWindow && popupWindow.closed) {
              clearInterval(checkWindowClosed);
              Swal.fire({
                icon: "success",
                title: "Order Placed Successfully!",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                this.router.navigate(['/']);  // Navigate to the home route after alert
              });
            }
          }, 500);
        },
        (error) => {
          Swal.fire({
            icon: "warning",
            title: `${error.error}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    }
    
  }

}
