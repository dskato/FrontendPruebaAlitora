import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './screens/user/user.component';
import { ProductsComponent } from './screens/products/products.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductsComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', redirectTo: '/user' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
