import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  ngOnInit() {
    this.ReplayContact();
  }

  constructor(private _ser: URLService) {

  }

  ConactArray: any
  ReplayContact() {
    this._ser.GetCntact().subscribe((data) => {
      this.ConactArray = data
      console.log(this.ConactArray, "this.ConactArray")
    }) 
  }

  deleteContactById(id: any) {
    this._ser.deletContact(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.ReplayContact();
    });
  }

}
