import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    CustomerComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
