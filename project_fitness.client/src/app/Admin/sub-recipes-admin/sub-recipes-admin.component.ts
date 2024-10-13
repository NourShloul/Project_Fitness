import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-sub-recipes-admin',
  templateUrl: './sub-recipes-admin.component.html',
  styleUrl: './sub-recipes-admin.component.css'
})
export class SubRecipesAdminComponent {
  ngOnInit() {
    this.GetAllSubRecipe()
  }
  constructor(private _ser:
    URLService) { }

  RecipeArray: any
  GetAllSubRecipe() {

    this._ser.getAllRecipes().subscribe((data) => {
      this.RecipeArray = data
      console.log(this.RecipeArray)

    })
  }

  deletrecipe(id: any) {
    this._ser.deletrecipe(id).subscribe(() => {
      alert("Sub-Recipe deleted successfully")
      this.GetAllSubRecipe();
    })
  }
}
