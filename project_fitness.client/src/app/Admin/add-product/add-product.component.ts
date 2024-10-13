import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Admin/update-product/services/product.service'; // Ensure this path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', Validators.required],
      image: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Product added successfully!', response);
          this.router.navigate(['/Dashboard/products']); 
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
