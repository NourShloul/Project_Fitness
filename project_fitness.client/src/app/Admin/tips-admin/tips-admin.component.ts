import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-tips-admin',
  templateUrl: './tips-admin.component.html',
  styleUrl: './tips-admin.component.css'
})
export class TipsAdminComponent {
  ngOnInit() {
    this.GetAllTip()
  }
  constructor(private _ser:
    URLService) { }

  RecipeArray: any
  GetAllTip() {

    this._ser.GetAllTips().subscribe((data) => {
      this.RecipeArray = data
      console.log(this.RecipeArray)

    })
  }

  delettips(id: any) {
    this._ser.deletTips(id).subscribe(() => {
      alert("Tips deleted successfully")
      this.GetAllTip();
    })
  }
}
