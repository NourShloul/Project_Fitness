import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Admin/update-product/services/product.service'; // Ensure the correct path to your service

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the product ID from the route
    this.productId = this.route.snapshot.params['id'];

    // Fetch the product data and initialize the form
    this.productService.getProduct(this.productId).subscribe((data) => {
      this.productForm = this.formBuilder.group({
        categoryId: [data.categoryId, Validators.required],
        productName: [data.productName, Validators.required],
        description: [data.description, Validators.required],
        price: [data.price, [Validators.required, Validators.min(0)]],
        stockQuantity: [data.stockQuantity, Validators.required],
        image: [data.image, Validators.required],
        discount: [data.discount, Validators.required]
      });
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // Call updateProduct with the product ID and updated product data
      this.productService.updateProduct(this.productId, this.productForm.value)
        .subscribe(() => {
          console.log('Product updated successfully');
          this.router.navigate(['/admin/products']); // Navigate back to the product list
        }, (error) => {
          console.error('Error updating product:', error);
        });
    }
  }
}
