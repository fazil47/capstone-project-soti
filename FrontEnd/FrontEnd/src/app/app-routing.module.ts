import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditproductsComponent } from './admin/editproducts/editproducts.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { RoleGuard } from './guards/role.guard';
import { ShoppingCartComponent } from './details/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'products/edit',
    component: EditproductsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'products/edit',
    component: EditproductsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  // { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'categories/edit',
    component: EditCategoryComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
