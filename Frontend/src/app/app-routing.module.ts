import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './dish/dish.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';
import { GenreComponent } from './genre/genre.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'menu', component: DishComponent},
  { path: 'menu/:id', component: DishDetailComponent},
  { path: 'customers', component: CustomerComponent},
  { path: 'customers/:id', component: CustomerDetailComponent},
  { path: 'bills', component: BillComponent, canActivate: [AuthGuard]},
  // { path: 'bills/:id', component: BillDetailComponent}, 
  { path: 'genres', component: GenreComponent},
  { path: 'genres/:id', component: GenreDetailComponent},
  { path: 'callback', component: CallbackComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
