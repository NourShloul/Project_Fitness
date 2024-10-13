import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Admin/update-product/services/product.service'; // Ensure the correct path to ProductService
import { Router } from '@angular/router'; // Import Router for navigation

// Define the Product interface outside the component class
interface Product {
  id?: number;
  categoryId: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  discount: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []; // Array to hold the list of products

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Fetch all products when the component initializes
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; // Assign the fetched products to the products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Method to navigate to the edit page for a product
  editProduct(id: number): void {
    this.router.navigate([`/editproduct/${id}`]); // Navigate to the edit page with the product ID
  }

  // Method to delete a product
  deleteProduct(id: number | undefined): void {
    if (id) { // Ensure the ID is defined before calling the delete function
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Product with id ${id} deleted`);
        // Remove the deleted product from the local array
        this.products = this.products.filter(product => product.id !== id);
      }, (error) => {
        console.error('Error deleting product:', error);
      });
    }
  }
}
