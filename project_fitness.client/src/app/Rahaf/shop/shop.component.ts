import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;
  sortOption: string = '';

  showFilters: boolean = true;
  filterBtnText: string = 'Hide filters';
  userId: number = 1;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.selectedCategory || product.categoryId === Number(this.selectedCategory);
      const matchesPrice = product.price >= this.minPrice && product.price <= this.maxPrice;
      return matchesCategory && matchesPrice;
    });

    
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.filterProducts();
  }


  addToCart(product: any): void {
    const cartItem = {
      productId: product.id,
      quantity: 1,
      price: product.price
    };

    this.cartService.addToCart(this.userId, cartItem).subscribe(
      () => {
        Swal.fire('Success', `1 unit of ${product.name} added to cart!`, 'success');
      },
      (error: any) => {
        Swal.fire('Error', 'Error adding product to cart.', 'error');
        console.error('Error adding product to cart:', error);
      }
    );
  }

  changeBtnTxt(): void {
    this.showFilters = !this.showFilters;
    this.filterBtnText = this.showFilters ? 'Hide filters' : 'Show filters';
  }
}
