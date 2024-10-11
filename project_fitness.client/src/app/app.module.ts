import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutrotionPageOneComponent } from './Nutrition/nutrotion-page-one/nutrotion-page-one.component';
import { RouterModule } from '@angular/router';
import { RecipsComponent } from './Nutrition/recips/recips.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NutrotionPageOneComponent,
    RecipsComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [{ path: "NutritionPageOne", component: NutrotionPageOneComponent },
        { path: "Recips", component: RecipsComponent },
        { path: "", component: HomePageComponent, pathMatch: "full" }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
