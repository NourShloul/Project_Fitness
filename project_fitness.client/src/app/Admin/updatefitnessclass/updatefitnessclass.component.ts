import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatefitnessclass',
  templateUrl: './updatefitnessclass.component.html',
  styleUrl: './updatefitnessclass.component.css'
})
export class UpdatefitnessclassComponent {

  param: any
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');

  }

  imageFile: any
  changeImageevent(event: any) {

    this.imageFile = event.target.files[0]
  }

  constructor(private _ser: URLService, private _active: ActivatedRoute) { }

  updateFitness(data: any) {
    debugger

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("fitnessClassesImage", this.imageFile)
    debugger
    this._ser.PUTfitnessclass(this.param, form).subscribe((data) => { alert("Fitness updated successfully") })

  }

}
