import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from '../product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  parameter: any;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _ser: ProductDetailsService
  ) { }

  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getServicesDetails(this.parameter);
  }

  getServicesDetails(id: any) {
    this._ser.getProductDetails(id).subscribe((data) => {
      this.product = data;
      console.log("this.product", this.product);
    });
  }

  cartItemObj: any = {

    "cartId": 0,
    "productId": 0,
    "quantity": 1,
    "price": 0,
    "product": {
      "id": 0,
      "categoryId": 0,
      "productName": "",
      "description": "",
      "price": 0,
      "image": ""

    }
  }
  

  addToCart(productID: any, price: any, productName: any, productImage: any): void {
    this.cartItemObj.productId = productID;
    this.cartItemObj.price = price;
    this.cartItemObj.product.productName = productName;
    this.cartItemObj.product.image = productImage;
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
