import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - My Robot Shop' },
  { path: 'cart', component: CartComponent, title: 'My Cart' },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: 'Catalog - My Robot Shop',
  },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In' },
  { redirectTo: '/home', pathMatch: 'full', path: '' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
