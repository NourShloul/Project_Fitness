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
import { FormsModule } from '@angular/forms'; 

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
    CartComponent, // Add CartComponent
    PaymentComponent // Add PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule ,
    RouterModule.forRoot(
      [
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

        { path: "**", redirectTo: "", pathMatch: "full" }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
