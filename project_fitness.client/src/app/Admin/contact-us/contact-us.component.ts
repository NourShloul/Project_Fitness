import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'] 
})
export class ContactUsComponent {

  ConactArray: any; 

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.ReplayContact(); 
  }

  ReplayContact() {
    this._ser.GetCntact().subscribe((data) => {
      this.ConactArray = data; 
      console.log(this.ConactArray, "this.ConactArray");
    });
  }

  deleteContactById(id: any) {
    this._ser.deletContact(id).subscribe(() => {
      alert("This message deleted successfully"); 
      this.ReplayContact(); 
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString); 
    return date.toLocaleString('en-US', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  openMail(email: string) {
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(mailUrl, '_blank'); 
  }
}
