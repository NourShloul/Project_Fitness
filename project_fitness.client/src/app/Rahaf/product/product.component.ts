import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service'; // Inject CartService to handle cart operations
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService, // Inject ProductService to fetch products
    private cartService: CartService, // Inject CartService to handle cart actions
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    // Fetch all products when the component loads
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Store fetched products in the products array
      },
      (error) => {
        console.error('Error fetching products:', error); // Handle errors
      }
    );
  }

  addToCart(product: any): void {
    const userId = 1; // Replace with dynamic user ID when implemented
    if (!product.quantity || product.quantity <= 0) {
      product.quantity = 1; // Default to 1 if no quantity is set
    }

    if (product.quantity > product.stockQuantity) {
      Swal.fire('Error', 'Not enough stock available!', 'error');
    } else {
      this.cartService.addToCart(userId, product).subscribe(
        (response) => {
          Swal.fire('Success', `${product.quantity} units of ${product.productName} added to cart!`, 'success');
        },
        (error) => {
          Swal.fire('Error', 'Error adding product to cart.', 'error');
          console.error('Error adding product to cart:', error);
        }
      );
    }
  }

  // Navigate to the product details page
  onViewDetails(id: any): void {
    this.router.navigate([`/ProductDetails/${id}`]); // Use router to navigate to the product details page
  }
}
