import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Admin/update-product/services/product.service'; // Ensure the correct path to ProductService
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts(); // Fetch the products initially
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Assign fetched data to products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(id: number): void {
    this.router.navigate([`/editproduct/${id}`]); // Redirect to the edit page
  }

  deleteProduct(id: number | undefined): void {
    if (id) {
      // Confirm deletion before proceeding
      if (confirm(`Are you sure you want to delete the product with ID: ${id}?`)) {
        this.productService.deleteProduct(id).subscribe(() => {
          console.log(`Product with id ${id} deleted`);
          this.fetchProducts(); // Refresh product list after deletion
        }, (error) => {
          console.error('Error deleting product:', error);
        });
      }
    }
  }
}
