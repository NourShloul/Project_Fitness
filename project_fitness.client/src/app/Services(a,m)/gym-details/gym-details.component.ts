import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']  
})
export class GymDetailsComponent implements OnInit {
  parameter: any;  
  DetailsArray: any[] = []; 

  constructor(private _ser: URLService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameter = this._route.snapshot.paramMap.get('id'); 
    if (this.parameter) {
      this.getDetails(this.parameter);
    } else {
      console.error('No ID parameter found in the route.');
    }
  }

  getDetails(id: string): void {
    this._ser.getGymDetails(id).subscribe(
      (data: any) => {
        this.DetailsArray = data;  
        console.log(this.DetailsArray, 'details');        },
      (error: any) => {
        console.error('Error fetching gym details:', error);  
      }
    );
  }
}
