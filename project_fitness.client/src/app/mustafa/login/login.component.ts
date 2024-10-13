import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  ngOnInit() { }
  constructor(private _ser: URLService, private _router: Router) { }
  loginNewUser(data: any) {
    debugger
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.loginUser(form).subscribe((newData) => {
      console.log(newData);
      this._ser['UserEmail'].next(newData.UserEmail);

      if (newData.isAdmin) {
        // عرض رسالة نجاح للمشرف (admin)
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome Admin!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['/admin']);
        });

      } else {
        // عرض رسالة نجاح للمستخدم العادي
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to the Home Page!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['/Home']);
        });
      }
    }, (error) => {
      // التحقق من رمز الخطأ
      if (error.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'No account found with this email address. Please try again.',
          confirmButtonText: 'Try Again'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error || 'An unexpected error occurred. Please try again.',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }


}
