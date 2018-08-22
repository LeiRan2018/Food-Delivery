import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { GenreComponent } from './genre/genre.component';

import { FormsModule }   from '@angular/forms';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './pages/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    CustomerComponent,
    BillComponent,
    HeaderComponent,
    GenreComponent,
    GenreDetailComponent,
    CustomerDetailComponent,
    DishDetailComponent,
    BillDetailComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
