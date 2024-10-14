import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updategym',
  templateUrl: './updategym.component.html',
  styleUrl: './updategym.component.css'
})
export class UpdategymComponent {

  param: any
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    this.getDetails(this.param);
  }

  imageFile: any
  changeImageevent(event: any) {

    this.imageFile = event.target.files[0]
  }

  constructor(private _ser: URLService, private _active: ActivatedRoute) { }

  updateServices(data: any) {
    debugger

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("gymImage", this.imageFile)
    debugger
    this._ser.PUTgym(this.param, form).subscribe((data) => { alert("service updated successfully") })

  }

  DetailsArray: any

  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data: any) => {
      this.DetailsArray = data;
      console.log(this.DetailsArray, 'details');
    });

  }

}
