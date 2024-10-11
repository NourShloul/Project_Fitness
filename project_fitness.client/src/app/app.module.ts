import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutrotionPageOneComponent } from './Nutrition/nutrotion-page-one/nutrotion-page-one.component';
import { RouterModule } from '@angular/router';
import { RecipsComponent } from './Nutrition/recips/recips.component';
import { SupRecipeComponent } from './Nutrition/sup-recipe/sup-recipe.component';
import { SubRecipeDetailsComponent } from './Nutrition/sub-recipe-details/sub-recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NutrotionPageOneComponent,
    RecipsComponent,
    SupRecipeComponent,
    SubRecipeDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
    [  { path: "NutritionPageOne", component: NutrotionPageOneComponent, pathMatch: "full" },
      //{ path: "NutritionPageOne", component: NutrotionPageOneComponent },
        { path: "Recips", component: RecipsComponent },
        { path: "SupRecipe/:id", component: SupRecipeComponent },
        { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent }

      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
