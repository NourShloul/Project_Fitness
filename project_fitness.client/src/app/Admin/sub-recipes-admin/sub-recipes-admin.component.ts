import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-sub-recipes-admin',
  templateUrl: './sub-recipes-admin.component.html',
  styleUrls: ['./sub-recipes-admin.component.css']
})
export class SubRecipesAdminComponent {

  searchTerm: string = '';  // متغير للبحث
  RecipeArray: any[] = [];  // جميع الوصفات الأصلية
  filteredRecipeArray: any[] = [];  // الوصفات المفلترة

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllSubRecipe();
  }

  GetAllSubRecipe() {
    this._ser.getAllRecipes().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredRecipeArray = this.RecipeArray;  // عرض جميع البيانات عند التحميل
      console.log(this.RecipeArray);
    });
  }

  filterRecipes() {
    if (!this.searchTerm) {
      // إذا لم يكن هناك نص في البحث، عرض جميع الوصفات
      this.filteredRecipeArray = this.RecipeArray;
    } else {
      // تصفية الوصفات بناءً على الاسم
      this.filteredRecipeArray = this.RecipeArray.filter(recipe =>
        recipe.subRecipeName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deletSSubrecipe(id: any) {
    this._ser.deletSubrecipe(id).subscribe(() => {
      alert("Sub-Recipe deleted successfully");
      this.GetAllSubRecipe();  // تحديث القائمة بعد الحذف
    });
  }
}
