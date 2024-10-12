import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = []; 

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; 
      },
      (error) => {
        console.error('Error fetching products:', error); 
      }
    );
  }

  addToCart(product: any): void {
    if (product.quantity > product.stockQuantity) {
      alert('Not enough stock available!');
    } else {
     
      console.log(`${product.quantity} units of ${product.productName} added to cart.`);
    
      alert(`${product.quantity} units of ${product.productName} added to cart!`);
    }
  }
  onViewDetails(id: any): void {
    // Navigate to the product details page, passing the product ID as a route parameter
    this.router.navigate([`/ProductDetails/${id}`]);
  }
}
