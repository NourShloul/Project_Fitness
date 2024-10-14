//import { Component } from '@angular/core';
//import { URLService } from '../../url/url.service';
//import { ActivatedRoute } from '@angular/router';

//@Component({
//  selector: 'app-update-sub-recipes-admin',
//  templateUrl: './update-sub-recipes-admin.component.html',
//  styleUrl: './update-sub-recipes-admin.component.css'
//})
//export class UpdateSubRecipesAdminComponent {
//  ogOnInit() {
//    this.getDetails(this.param)
// }
//  param: any
//  imageFile: any
//  changeimageevevnt(event: any) {
//    this.imageFile = event.target.files[0]
//  }
//  constructor(private _ser: URLService, private _active: ActivatedRoute) {
//    this.param = this._active.snapshot.paramMap.get('id');
//  }


//  UpdateSubRecipeAdmin(data: any) {

//    var form = new FormData();
//    for (let key in data) {
//      form.append(key, data[key])
//    }
//    form.append("subRecipeImage", this.imageFile)
//    this._ser.UpdateSubRecipe(this.param, form).subscribe((data) => {
//      alert("subrecipe Updated Successfully")
//    })
//  }



//  DetailsArray: any
//  getDetails(id: any) {
//    this._ser.getSubRecipeDetails(id).subscribe((data) => {

//      this.DetailsArray = data
//    })

//  }
//}

import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';  // استيراد الخدمة التي تستعملها
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sub-recipes-admin',
  templateUrl: './update-sub-recipes-admin.component.html',
  styleUrls: ['./update-sub-recipes-admin.component.css']
})
export class UpdateSubRecipesAdminComponent implements OnInit {

  param: any;
  imageFile: any;
  DetailsArray: any = {};  // تعريف المتغير الذي سيحمل البيانات
  RecipeArray: any[] = [];
  constructor(private _ser: URLService, private _active: ActivatedRoute, private _src: URLService) {
    // جلب ID من الرابط
    this.param = this._active.snapshot.paramMap.get('id');
  }

  // استخدام ngOnInit لتحميل البيانات عند تهيئة المكون
  ngOnInit() {
    this.getDetails(this.param);  // استدعاء الدالة لتحميل التفاصيل بناءً على ID
    this.GetAllRecipe(); // استدعاء الدالة عند التحميل
  }

  // دالة لتغيير صورة المنتج
  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0];
  }

  // دالة تحديث الوصفة الفرعية
  UpdateSubRecipeAdmin(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("subRecipeImage", this.imageFile);

    this._ser.UpdateSubRecipe(this.param, form).subscribe(() => {
      alert("Subrecipe Updated Successfully");
    });
  }

  // دالة لجلب تفاصيل الوصفة الفرعية
  getDetails(id: any) {
    this._ser.getSubRecipeDetails(id).subscribe((data) => {
      this.DetailsArray = data;  // وضع البيانات في المتغير ليتم عرضها في الفورم
    });
  }

  GetAllRecipe() {
    this._src.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      console.log("All Recipes: ", this.RecipeArray);
    });
  }
}

