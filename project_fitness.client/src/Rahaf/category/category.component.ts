import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

//ngOnInit(): void {
//  this.categoryService.getCategory().subscribe(
//    (data) => {
//      this.categories = data;
//    },
//    (error) => {
//      console.error('Error fetching categories:', error);
//    }
//  );
//}

//viewCategoryProducts(categoryId: number): void {

//  this.router.navigate(['/products/category', categoryId]);
//}
}
