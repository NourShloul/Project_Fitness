import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { URLService } from '../url/url.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {
  personalInfo: any = {
    userName: '',
    userPhone: '',
    userAddress: ''
  };

  selectedFile: File | null = null;
  userId: number | undefined;

  constructor(private _ser: URLService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = Number(localStorage.getItem('UserId'))
    console.log('Extracted userId from URL:', this.userId);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('UserName', this.personalInfo.userName);
    formData.append('UserPhone', this.personalInfo.userPhone);
    formData.append('UserAddress', this.personalInfo.userAddress);

    if (this.selectedFile) {
      formData.append('UserImage', this.selectedFile);
    }

    if (this.userId) { 
      this._ser.updateUserProfile(this.userId, formData).subscribe({
        next: (response: any) => {
          console.log('Profile updated successfully', response);
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      });
    } else {
      console.error('User ID is missing!');
    }
  }
}
