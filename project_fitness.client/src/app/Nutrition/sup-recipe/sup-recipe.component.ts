import { Component } from '@angular/core';
import { UrlNutritionService } from '../URL-Nutrition/url-nutrition.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sup-recipe',
  templateUrl: './sup-recipe.component.html',
  styleUrl: './sup-recipe.component.css'
})
export class SupRecipeComponent {
  parameter: any
  servicesArray: any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getsubrecipr(this.parameter);
  }
  subRecipeData: any
  constructor(private _ser: UrlNutritionService, private _route: ActivatedRoute) { }
  getsubrecipr(id: any) {
    this._ser.getSubRecipe(id).subscribe((data) => {
      this.subRecipeData = data
      console.log("this.subServiceData", this.subRecipeData)
    })
  }
}
