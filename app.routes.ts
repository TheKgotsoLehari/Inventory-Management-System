import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './authentication/register/register.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { RouterModule, Routes } from '@angular/router';




export const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'productListing', component:ProductListingComponent},

  {path:'addProduct', component:AddProductsComponent},

  {path: 'register', component:RegisterComponent},
  {path: '', redirectTo: 'login', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
