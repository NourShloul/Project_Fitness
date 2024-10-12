import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrl: './gym-details.component.css'
})
export class GymDetailsComponent {
  parameter: any
  array: any
  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get('id');
    this.getDetails(this.parameter)
    console.log(this.DetailsArray, "details")
  }
  constructor(private _ser: URLService, private _rout: ActivatedRoute) { }

  DetailsArray: any
  getDetails(id: any) {
    this._ser.getGymDeyails(id).subscribe((data:any) => {

      this.DetailsArray = data
    })

  }
}
