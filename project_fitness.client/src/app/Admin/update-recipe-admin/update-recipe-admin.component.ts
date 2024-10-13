import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-recipe-admin',
  templateUrl: './update-recipe-admin.component.html',
  styleUrl: './update-recipe-admin.component.css'
})
export class UpdateRecipeAdminComponent {
  ogOnInit() { }
  param: any
  imageFile: any
  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0]
  }
  constructor(private _ser: URLService, private _active: ActivatedRoute) {
    this.param = this._active.snapshot.paramMap.get('id');
  }


  UpdateRecipeAdmin(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("ImageRecipe", this.imageFile)
    this._ser.UpdateRecipe(this.param, form).subscribe((data) => {
      alert("Services Updated Sucessfully")
    })
  }
}

