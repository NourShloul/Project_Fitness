import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-all-gyms',
  templateUrl: './all-gyms.component.html',
  styleUrl: './all-gyms.component.css'
})
export class AllGymsComponent {

  ngOnInit() {
   

    this.getGyms();
  }
  constructor(private _ser: URLService) {


  }

  servicesArray: any

  getGyms() {
  
    this._ser.GetAllGyms().subscribe((data) => {
      this.servicesArray = data
      console.log(this.servicesArray, "this.servicesArray")
    })

  }
  
  deleteGymById(id: any) {
    this._ser.deletgym(id).subscribe(() => {
      alert("Gym deleted successfully")
      this.getGyms();
    })
  }

}
