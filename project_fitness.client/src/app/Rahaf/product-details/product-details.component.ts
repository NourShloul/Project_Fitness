import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: any; 

  constructor(private router: Router) { } 

  addToCart(product: any): void {
   

    Swal.fire({
      title: 'Success!',
      text: 'Item added to cart successfully! Go to the cart to make an order.',
      icon: 'success',
      confirmButtonText: 'Go to Cart',
      cancelButtonText: 'Continue Shopping',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
   
        this.router.navigate(['/cart']);
      } else if (result.isDismissed) {
     
        console.log('Continuing shopping...');
      }
    });
  }
}
