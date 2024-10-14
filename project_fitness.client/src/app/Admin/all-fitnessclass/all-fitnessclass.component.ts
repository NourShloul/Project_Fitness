import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2'; // استيراد SweetAlert2

@Component({
  selector: 'app-all-fitnessclass',
  templateUrl: './all-fitnessclass.component.html',
  styleUrls: ['./all-fitnessclass.component.css']
})
export class AllFitnessclassComponent {
  ngOnInit() {
    this.getFitnessClass();
  }

  constructor(private _ser: URLService) { }

  servicesArray: any;

  getFitnessClass() {
    this._ser.GetAllFitness().subscribe((data) => {
      this.servicesArray = data;
      console.log(this.servicesArray, "this.servicesArray");
    });
  }

  deleteFitnessClassById(id: any) {
    // نافذة تأكيد الحذف
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this fitness class? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // في حالة تأكيد الحذف
        this._ser.deletfitnessclass(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The fitness class has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getFitnessClass(); // تحديث قائمة الفيتنس بعد الحذف
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the fitness class.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
