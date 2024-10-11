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

import { ContactUsComponent } from './Rahaf/contact-us/contact-us.component';
import { CategoryComponent } from './Rahaf/category/category.component';
import { ProductComponent } from './Rahaf/product/product.component';
import { ProductDetailsComponent } from './Rahaf/product-details/product-details.component';
import { AboutUsComponent } from './Rahaf/about-us/about-us.component';
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

import { CartService } from './Rahaf/cart.service';
import { ProductService } from './Rahaf/product.service';

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
    ContactUsComponent,
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
    AboutUsComponent,
    PolicesComponent,
    CartComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    MainServicesComponent,
    GymComponent,
    FitnessComponent,
    AboutComponent,
    ContactComponent
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
      { path: "SupRecipeDetails/:id", component: SubRecipeDetailsComponent },
      { path: "contact-us", component: ContactUsComponent },
      { path: "categories", component: CategoryComponent },
      { path: 'Product/:id', component: ProductComponent },
      { path: 'ProductDetails/:id', component: ProductDetailsComponent },
      { path: 'about-us', component: AboutUsComponent },
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
      { path: "**", redirectTo: "", pathMatch: "full" }
    ])
      { path: "Contact", component: ContactComponent },
      { path: "AllFitness", component: FitnessComponent },

      ])
  ],
  providers: [
    CartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
