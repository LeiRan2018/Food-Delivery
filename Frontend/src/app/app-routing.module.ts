import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './dish/dish.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'menu', component: DishComponent},
  { path: 'customers', component: CustomerComponent},
  { path: 'bills', component: BillComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
