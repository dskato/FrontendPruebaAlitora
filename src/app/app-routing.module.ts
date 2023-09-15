import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './screens/user/user.component';
import { ProductsComponent } from './screens/products/products.component';
import { OrdersComponent } from './screens/orders/orders.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'product', component: ProductsComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', redirectTo: '/user' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
