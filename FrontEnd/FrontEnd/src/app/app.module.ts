import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { SubcatComponent } from './products/subcat/subcat.component';
import { ProdListComponent } from './products/prod-list/prod-list.component';
import { DetailsComponent } from './details/details.component';
import { ShoppingCartComponent } from './details/shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { UserdetailsComponent } from './login/userdetails/userdetails.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditproductsComponent } from './admin/editproducts/editproducts.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomePageComponent,
    HeaderComponent,
    CategoryListComponent,
    ContactComponent,
    ProductsComponent,
    SubcatComponent,
    ProdListComponent,
    DetailsComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    UserdetailsComponent,
    ProductDetailsComponent,
    EditproductsComponent,
    EditCategoryComponent,
    FooterComponent,
    SearchbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001', 'localhost:5204'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
