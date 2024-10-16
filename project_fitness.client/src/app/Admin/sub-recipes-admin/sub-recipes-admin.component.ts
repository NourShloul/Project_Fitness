import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-sub-recipes-admin',
  templateUrl: './sub-recipes-admin.component.html',
  styleUrls: ['./sub-recipes-admin.component.css']
})
export class SubRecipesAdminComponent {

  searchTerm: string = ''; 
  RecipeArray: any[] = []; 
  filteredRecipeArray: any[] = [];  

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllSubRecipe();
  }

  GetAllSubRecipe() {
    this._ser.getAllRecipes().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredRecipeArray = this.RecipeArray;  
      console.log(this.RecipeArray);
    });
  }

  filterRecipes() {
    if (!this.searchTerm) {
      this.filteredRecipeArray = this.RecipeArray;
    } else {
      this.filteredRecipeArray = this.RecipeArray.filter(recipe =>
        recipe.subRecipeName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deletSSubrecipe(id: any) {
    this._ser.deletSubrecipe(id).subscribe(() => {
      alert("SubRecipe deleted successfully");
      this.GetAllSubRecipe();  
    });
  }
}
