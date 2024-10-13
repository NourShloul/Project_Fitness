import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfitness',
  templateUrl: './addfitness.component.html',
  styleUrl: './addfitness.component.css'
})
export class AddfitnessComponent {
  ngOnInit() { }

  constructor(private _ser: URLService, private _router: Router) { }

  // هذا الكود حتى يتم الصورة من ملف اسمه تارجيت وداخل ملف ملف اخر اسمه فايلز والانديكس صفر
  image: any
  changeImage(event: any) {

    debugger
    this.image = event.target.files[0]

  }

  addNewfitnessclass(data: any) {
    debugger
    var form = new FormData();//تحويل الداتا التي تأتي من الفورم لشكل يفهمه سواجر وهو الفورم داتا
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("fitnessClassesImage", this.image);
    this._ser.addfitnessclass(form).subscribe(() => {
      alert("Fitness Class added succesfully")
    },
      (error) => {
        //هذا الكود يظهر رسالة الخطأ التي وضعتها في سواجر على شكل اليرت  في حال حدوث خطأ
        alert(error.error)
      })
  }
}
