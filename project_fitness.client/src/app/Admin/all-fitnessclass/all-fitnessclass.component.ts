import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-all-fitnessclass',
  templateUrl: './all-fitnessclass.component.html',
  styleUrl: './all-fitnessclass.component.css'
})
export class AllFitnessclassComponent {
  ngOnInit() {

    this.getFitnessClass();
  }
  constructor(private _ser: URLService) {


  }

  servicesArray: any

  getFitnessClass() {
    this._ser.GetAllFitness().subscribe((data) => {
      this.servicesArray = data
      console.log(this.servicesArray, "this.servicesArray")
    })

  }

  deleteFitnessClassById(id: any) {
    this._ser.deletfitnessclass(id).subscribe(() => {
      alert("Sevice deleted successfully")
      this.getFitnessClass();
    })
  }
}
