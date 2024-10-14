import { Component } from '@angular/core';
import { URLService } from '../url/url.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  ngOnInit() {
    const userId = 1;
    this.GetAllOrder(userId);
    this.GetOrderUserID(userId);
  }
  constructor(private _ser:
    URLService) { }

  UserArray: any
  GetAllOrder(id: number) {
    this._ser.GetUserID(id).subscribe((data) => {
      this.UserArray = data;
      console.log(this.UserArray);
    });
  }
  OrderArray: any
  GetOrderUserID(id: number) {
    this._ser.GetUserID(id).subscribe((data) => {
      this.OrderArray = data;
      console.log(this.OrderArray);
    });
  }


  
}
