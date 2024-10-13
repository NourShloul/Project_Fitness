import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-recipe-admain',
  templateUrl: './recipe-admain.component.html',
  styleUrl: './recipe-admain.component.css'
})
export class RecipeAdmainComponent {
  ngOnInit() {
    this.GetAllRecipe()
  }
  constructor(private _ser:
    URLService) { }

  RecipeArray: any
  GetAllRecipe() {

    this._ser.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data
      console.log(this.RecipeArray)

    })
  }

  deletrecipe(id: any) {
    this._ser.deletrecipe(id).subscribe(() => {
      alert("Gym deleted successfully")
      this.GetAllRecipe();
    })
  }
}

