import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-tips-admin',
  templateUrl: './tips-admin.component.html',
  styleUrls: ['./tips-admin.component.css']
})
export class TipsAdminComponent {

  searchTerm: string = '';  // متغير للبحث
  RecipeArray: any[] = [];  // جميع النصائح الأصلية
  filteredTipsArray: any[] = [];  // النصائح المفلترة

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllTip();
  }

  GetAllTip() {
    this._ser.GetAllTips().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredTipsArray = this.RecipeArray;  // عرض جميع البيانات عند التحميل
      console.log(this.RecipeArray);
    });
  }

  filterTips() {
    if (!this.searchTerm) {
      // إذا لم يكن هناك نص في البحث، عرض جميع النصائح
      this.filteredTipsArray = this.RecipeArray;
    } else {
      // تصفية النصائح بناءً على الاسم
      this.filteredTipsArray = this.RecipeArray.filter(tip =>
        tip.tipsName.toLowerCase().includes(this.searchTerm.toLowerCase())  // البحث في اسم النصائح
      );
    }
  }

  delettips(id: any) {
    this._ser.deletTips(id).subscribe(() => {
      alert("Tips deleted successfully");
      this.GetAllTip();  // تحديث القائمة بعد الحذف
    });
  }
}
