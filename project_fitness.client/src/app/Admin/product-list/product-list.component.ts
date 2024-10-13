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

  products: Product[] = []; 

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; 
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(id: number): void {
    this.router.navigate([`/editproduct/${id}`]); 
  }


  deleteProduct(id: number | undefined): void {
    if (id) { 
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Product with id ${id} deleted`);
    
        this.products = this.products.filter(product => product.id !== id);
      }, (error) => {
        console.error('Error deleting product:', error);
      });
    }
  }
}
