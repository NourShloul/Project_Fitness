import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sub-recipes-admin',
  templateUrl: './update-sub-recipes-admin.component.html',
  styleUrl: './update-sub-recipes-admin.component.css'
})
export class UpdateSubRecipesAdminComponent {
  ogOnInit() { }
  param: any
  imageFile: any
  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0]
  }
  constructor(private _ser: URLService, private _active: ActivatedRoute) {
    this.param = this._active.snapshot.paramMap.get('id');
  }


  UpdateSubRecipeAdmin(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("subRecipeImage", this.imageFile)
    this._ser.UpdateSubRecipe(this.param, form).subscribe((data) => {
      alert("subrecipe Updated Successfully")
    })
  }
}
