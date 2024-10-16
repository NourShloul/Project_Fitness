import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-add-subrecipe-admin',
  templateUrl: './add-subrecipe-admin.component.html',
  styleUrls: ['./add-subrecipe-admin.component.css']
})
export class AddSubrecipeAdminComponent implements OnInit {

  RecipeArray: any[] = [];
  image: any;

  constructor(private _src: URLService) { }

  ngOnInit() {
    this.GetAllRecipe(); 
  }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  AddNewSubRecipe(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("subRecipeImage", this.image);
    this._src.AddSubRecipe(form).subscribe(() => {
      alert("SubRecipe added successfully");
    });
  }

  GetAllRecipe() {
    this._src.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      console.log("All Recipes: ", this.RecipeArray);
    });
  }
}

