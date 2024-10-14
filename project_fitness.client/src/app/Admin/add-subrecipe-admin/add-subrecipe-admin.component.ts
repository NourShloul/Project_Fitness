import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-add-subrecipe-admin',
  templateUrl: './add-subrecipe-admin.component.html',
  styleUrl: './add-subrecipe-admin.component.css'
})
export class AddSubrecipeAdminComponent {


  constructor(private _src: URLService) {

  }

  image: any
  changeImage(event: any) {

    this.image = event.target.files[0]

  }

  AddNewSubRecipe(data: any) {
    debugger
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("subRecipeImage", this.image)
    this._src.AddSubRecipe(form).subscribe(() => {
      alert("added")
    })
  }
}
