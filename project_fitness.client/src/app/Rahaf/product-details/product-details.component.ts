import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { ProductDetailsService } from '../product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: any;
  parameter:any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getServicesDetails(this.parameter);
  }

  constructor(private router: Router, private _route: ActivatedRoute, private _ser: ProductDetailsService) { }


  getServicesDetails(id: any) {
    this._ser.getProductDetails(id).subscribe((data) => {
      this.product = data
      console.log("this.product", this.product)
    })
  }

  cartItemObj: any = {
    
  "productId": 0,
  "quantity": 0,
  "price": 0,
  "cartId": 0

  }

  addToCart(productID: any, price: any): void {
    debugger;
    this.cartItemObj.productId = productID;
    this.cartItemObj.price = price;
    this._ser.addToCart({ ...this.cartItemObj });

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
