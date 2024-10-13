import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-addgym',
  templateUrl: './addgym.component.html',
  styleUrl: './addgym.component.css'
})
export class AddgymComponent {
  ngOnInit() { }

  constructor(private _ser: URLService) { }

  image: any
  changeImage(event: any) {
    debugger
    this.image = event.target.files[0]

  }


  addnewGym(data: any) {
    debugger
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }

    form.append("gymImage", this.image)

    this._ser.addGym(form).subscribe(() => {
      alert("Gym added successfully")
    },
      (error) => {

        alert(error.error)
      })
  }

}
