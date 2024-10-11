import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';/////
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutrotionPageOneComponent } from './Nutrition/nutrotion-page-one/nutrotion-page-one.component';
import { RouterModule } from '@angular/router';
import { RecipsComponent } from './Nutrition/recips/recips.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SupRecipeComponent } from './Nutrition/sup-recipe/sup-recipe.component';
import { SubRecipeDetailsComponent } from './Nutrition/sub-recipe-details/sub-recipe-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NutrotionPageOneComponent,
    RecipsComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    SupRecipeComponent,
    SubRecipeDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule ,
    RouterModule.forRoot(
      [
        { path: "", component: HomePageComponent, pathMatch: "full" },
        { path: "NutritionPageOne", component: NutrotionPageOneComponent },
        { path: "Recips", component: RecipsComponent },
        { path: "SupRecipe/:id", component: SupRecipeComponent },
        { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent }
       
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
