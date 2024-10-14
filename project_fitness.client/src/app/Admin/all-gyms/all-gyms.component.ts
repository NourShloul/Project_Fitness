import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-all-gyms',
  templateUrl: './all-gyms.component.html',
  styleUrls: ['./all-gyms.component.css']  // تأكد من تصحيح الاسم إلى styleUrls وليس styleUrl
})
export class AllGymsComponent implements OnInit {

  servicesArray: any[] = [];  // جميع الصالات الرياضية
  filteredServicesArray: any[] = [];  // الصالات الرياضية بعد التصفية
  searchTerm: string = '';  // مصطلح البحث

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getGyms();
  }

  getGyms() {
    this._ser.GetAllGyms().subscribe((data) => {
      this.servicesArray = data;
      this.filteredServicesArray = this.servicesArray;  // في البداية عرض جميع البيانات
      console.log(this.servicesArray, "this.servicesArray");
    });
  }

  filterServices() {
    if (!this.searchTerm) {
      this.filteredServicesArray = this.servicesArray;  // عرض جميع الصالات الرياضية إذا كان البحث فارغًا
    } else {
      this.filteredServicesArray = this.servicesArray.filter(service =>
        service.gymName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteGymById(id: any) {
    this._ser.deletgym(id).subscribe(() => {
      alert("Gym deleted successfully");
      this.getGyms();
    });
  }
}
