import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-recipe-admain',
  templateUrl: './recipe-admain.component.html',
  styleUrls: ['./recipe-admain.component.css']
})
export class RecipeAdmainComponent {

  searchTerm: string = '';  // متغير للبحث
  RecipeArray: any[] = [];  // جميع الوصفات الأصلية
  filteredRecipeArray: any[] = [];  // الوصفات المفلترة

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllRecipe();
  }

  GetAllRecipe() {
    this._ser.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredRecipeArray = this.RecipeArray;  // عرض جميع البيانات عند التحميل
      console.log("All Recipes: ", this.RecipeArray);  // عرض البيانات في وحدة التحكم
    });
  }

  filterRecipes() {
    console.log("Search Term: ", this.searchTerm);  // عرض مصطلح البحث
    if (!this.searchTerm) {
      // إذا لم يكن هناك نص في البحث، عرض جميع الوصفات
      this.filteredRecipeArray = this.RecipeArray;
    } else {
      // تصفية الوصفات بناءً على الاسم
      this.filteredRecipeArray = this.RecipeArray.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(this.searchTerm.toLowerCase())  // استخدم recipeName بدلاً من name
      );
      console.log("Filtered Recipes: ", this.filteredRecipeArray);  // عرض البيانات المفلترة في وحدة التحكم
    }
  }

  deletrecipe(id: any) {
    this._ser.deletrecipe(id).subscribe(() => {
      alert("Recipe deleted successfully");
      this.GetAllRecipe();  // تحديث القائمة بعد الحذف
    });
  }
}
