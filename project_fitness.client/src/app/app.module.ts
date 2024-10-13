import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

import { CategoryComponent } from './Rahaf/category/category.component';
import { ProductComponent } from './Rahaf/product/product.component';
import { ProductDetailsComponent } from './Rahaf/product-details/product-details.component';

import { PolicesComponent } from './Rahaf/polices/polices.component';
import { CartComponent } from './Rahaf/cart/cart.component';
import { PaymentComponent } from './Rahaf/payment/payment.component';

import { RegisterComponent } from './mustafa/register/register.component';
import { LoginComponent } from './mustafa/login/login.component';
import { MainServicesComponent } from './Services(a,m)/main-services/main-services.component';
import { GymComponent } from './Services(a,m)/gym/gym.component';
import { FitnessComponent } from './Services(a,m)/fitness/fitness.component';
import { AboutComponent } from './AOQ/about/about.component';
import { ContactComponent } from './AOQ/contact/contact.component';
import { ShopComponent } from './Rahaf/shop/shop.component';
import { CartService } from './Rahaf/cart.service';
import { ProductService } from './Rahaf/product.service';
import { GymDetailsComponent } from './Services(a,m)/gym-details/gym-details.component';
import { TipsComponent } from './Nutrition/tips/tips.component';
import { FitnessDetailsComponent } from './Services(a,m)/fitness-details/fitness-details.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AllGymsComponent } from './Admin/all-gyms/all-gyms.component';
import { TestimonialComponent } from './AOQ/testimonial/testimonial.component';
import { ProfileComponent } from './profile/profile.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { AllFitnessclassComponent } from './Admin/all-fitnessclass/all-fitnessclass.component';
import { UpdategymComponent } from './Admin/updategym/updategym.component';
import { UpdatefitnessclassComponent } from './Admin/updatefitnessclass/updatefitnessclass.component';

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
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
    PolicesComponent,
    CartComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    MainServicesComponent,
    GymComponent,
    FitnessComponent,
    AboutComponent,
    ContactComponent,
    GymDetailsComponent,
    GymDetailsComponent,
    TipsComponent,
    DashboardComponent,
    AllGymsComponent,
    ShopComponent,
    TipsComponent,
    TestimonialComponent,
    ProfileComponent,
    ThankyouComponent,
    TestimonialComponent,
    AllFitnessclassComponent,
    UpdategymComponent,
    UpdatefitnessclassComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomePageComponent, pathMatch: "full" },
      { path: "NutritionPageOne", component: NutrotionPageOneComponent },
      { path: "Recips", component: RecipsComponent },
      { path: "SupRecipe/:id", component: SupRecipeComponent },
      { path: "Tips", component: TipsComponent },
      { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent },
      { path: "categories", component: CategoryComponent },
      { path: 'Product/:id', component: ProductComponent },
      { path: 'ProductDetails/:id', component: ProductDetailsComponent },
      { path: 'policies', component: PolicesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'payment', component: PaymentComponent },
      { path: "Register", component: RegisterComponent },
      { path: "Login", component: LoginComponent },
      { path: "Home", component: HomePageComponent },
      { path: "AllGyms", component: GymComponent },
      { path: "About", component: AboutComponent },
      { path: "services", component: MainServicesComponent },
      { path: "Contact", component: ContactComponent },
      { path: "GymDetails/:id", component: GymDetailsComponent },
      { path: "AllFitness", component: FitnessComponent },
      { path: "FitnessDetails/:id", component: FitnessDetailsComponent },
      { path: "Testimonial ", component: TestimonialComponent },
      { path: "shop", component: ShopComponent },
      {
        path: "Dashboard", component: DashboardComponent, children: [
          { path: "AllGymAdmin", component: AllGymsComponent },
          { path: "editgym", component: UpdategymComponent },


        ]
      },
      { path: "Profile", component: ProfileComponent },
      { path: "Thankyou", component: ThankyouComponent },







      { path: "**", redirectTo: "", pathMatch: "full" },








    ])
  ],
  providers: [
    CartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
