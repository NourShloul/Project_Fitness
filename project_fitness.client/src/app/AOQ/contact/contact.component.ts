import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ngOnInit() {
  }

  constructor(private _ser: URLService) {

  }

  AddNewMessage(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.addContact(form).subscribe(() => {
      alert("The Message Send Successfully")
    },
      (error) => {
        // هنا يتم عرض رسالة خطأ مخصصة
        if (error.status === 400) {
          // عندما يكون الخطأ من نوع Bad Request (مثلاً خطأ في البيانات المدخلة)
          alert("There was an error in the data you submitted. Please check your inputs.");
        } else if (error.status === 500) {
          // عندما يكون الخطأ من نوع Internal Server Error
          alert("An internal server error occurred. Please try again later.");
        } else {
          // لأي أخطاء أخرى
          alert("An unexpected error occurred: " + error.message);
        }
      }
    );
  }
}
