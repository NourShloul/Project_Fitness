import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';

interface Category {
  id?: number;
  categoryName: string;
  description: string;
  image?: string;
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategory: string = '';
  description: string = '';
  image: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addCategory() {
    const category: Category = {
      categoryName: this.newCategory,
      description: this.description,
      image: this.image
    };

    this.categoryService.addCategory(category).subscribe(
      () => {
        this.getCategories();  // Reload categories after adding
        this.newCategory = '';
        this.description = '';
        this.image = '';
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.getCategories();  // Reload categories after deletion
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}
