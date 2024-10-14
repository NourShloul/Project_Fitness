import { Component, OnInit } from '@angular/core';
import { URLService } from '../url/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserArray: any; // تأكد من استخدام النوع المناسب

  constructor(private userService: URLService, private router: Router) { }
  userId: any;

  ngOnInit(): void {
    this.userService.UserIdmm.subscribe(user => {
      this.userId = user,
        console.log(this.userId);
    });
    this.loadUserData();
  }

  loadUserData() {
    
    this.userService.GetUserID(this.userId).subscribe(data => {
      this.UserArray = data;
      console.log(this.UserArray)
      this.UserArray.orderItems = this.flattenOrderItems(data.orders);
    });
  }
  //redirectToEdit() {
  //  this.router.navigate([`/EditPersonalInfo/${this.userId}`]);  
  //}
  private flattenOrderItems(orders: any[]): any[] {
    
    return orders.reduce((acc, order) => {
      return acc.concat(order.orderItems);
    }, []);
  }
}
