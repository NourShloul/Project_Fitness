import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-add-recipe-admin',
  templateUrl: './add-recipe-admin.component.html',
  styleUrl: './add-recipe-admin.component.css'
})
export class AddRecipeAdminComponent {


  constructor(private _src: URLService) {

  }

  image: any
  changeImage(event: any) {

    this.image = event.target.files[0]

  }

  AddNewRecipeType(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("RecipeImage", this.image)
    this._src.AddRecipeTaype(form).subscribe(() => {
      alert("added")
    })
  }
}

