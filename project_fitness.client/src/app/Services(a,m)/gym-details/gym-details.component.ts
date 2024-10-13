import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']  
})
export class GymDetailsComponent implements OnInit {


  parameter: any 
  DetailsArray: any


  ngOnInit() {
    debugger
    this.parameter = this._route.snapshot.paramMap.get("id"); 
    this.getDetails(this.parameter);
    
  }

  constructor(private _ser: URLService, private _route: ActivatedRoute) { }

  getDetails(id: any) {
    debugger
    this._ser.getGymDetails(id).subscribe((data: any) => {
        this.DetailsArray = data;  
        console.log(this.DetailsArray, 'details');
      })
  }
  
  addsubscribtion(price: number, months: number) {
    console.log(`Subscription selected: ${months} months, total price: ${price} JD`);
  }
}
