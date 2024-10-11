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
import { RegisterComponent } from './mustafa/register/register.component';
import { LoginComponent } from './mustafa/login/login.component';
import { MainServicesComponent } from './Services(a,m)/main-services/main-services.component';
import { GymComponent } from './Services(a,m)/gym/gym.component';
import { FitnessComponent } from './Services(a,m)/fitness/fitness.component';

@NgModule({
  declarations: [
    AppComponent,
    NutrotionPageOneComponent,
    RecipsComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    SupRecipeComponent,
    SubRecipeDetailsComponent,
    RegisterComponent,  // أضف RegisterComponent هنا
    LoginComponent,
    SubRecipeDetailsComponent,
    MainServicesComponent,
    GymComponent,
    FitnessComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [{ path: "", component: HomePageComponent, pathMatch: "full" },
        { path: "NutritionPageOne", component: NutrotionPageOneComponent },
        { path: "Recips", component: RecipsComponent },
        { path: "SupRecipe/:id", component: SupRecipeComponent },
        { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent },
        { path: "Register", component: RegisterComponent },
        { path: "Login", component: LoginComponent },
        { path: "Home", component: HomePageComponent },
        { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent },
        { path: "AllGyms", component: GymComponent },
        { path: "services", component: MainServicesComponent }
       
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
