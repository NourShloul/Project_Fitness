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
  product: any; // Holds the product details fetched from the service
  parameter: any; // Holds the product ID from the route parameter

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
  };

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _ser: ProductDetailsService
  ) { }

  ngOnInit() {
    // Get product ID from the route
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getProductDetails(this.parameter);
  }

  // Fetch product details using the service
  getProductDetails(id: any) {
    this._ser.getProductDetails(id).subscribe(
      (data) => {
        this.product = data;
        console.log("Product details:", this.product);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // Add product to cart and show Swal alert
  addToCart(productId: any, price: any, productName: any, productImage: any): void {
    // Update cartItem object with product details
    this.cartItemObj.productId = productId;
    this.cartItemObj.price = price;
    this.cartItemObj.product.productName = productName;
    this.cartItemObj.product.image = productImage;

    // Call the service to add the product to the cart
    this._ser.addToCart({ ...this.cartItemObj }).subscribe(
      () => {
        // Success alert with navigation options
        Swal.fire({
          title: 'Success!',
          text: 'Item added to cart successfully! Go to the cart to complete your order.',
          icon: 'success',
          confirmButtonText: 'Go to Cart',
          cancelButtonText: 'Continue Shopping',
          showCancelButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/cart']); // Navigate to cart on confirmation
          } else if (result.isDismissed) {
            console.log('Continue shopping...');
          }
        });
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }
}
