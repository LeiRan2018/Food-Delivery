import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { BillComponent } from './bill/bill.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { GenreComponent } from './genre/genre.component';

import { FormsModule }   from '@angular/forms';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './pages/callback/callback.component';
import { FormComponent } from './bill/form/form.component';
import { FormBillComponent } from './bill/form-bill/form-bill.component';
import { LoadingComponent } from './core/loading.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    BillComponent,
    HeaderComponent,
    GenreComponent,
    GenreDetailComponent,
    DishDetailComponent,
    BillDetailComponent,
    CallbackComponent,
    FormComponent,
    FormBillComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
