import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill.model';
import { BillService } from '../services/bill.service';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  bills: Bill[];
  dish_list: Dish[];
  customer_list: Customer[];


  new_bill = this.fb.group({
    customer: ['', Validators.required],
    dishes: this.fb.array([this.fb.control('')])
  })

  constructor(
    private billservice: BillService,
    private dishservice: DishService,
    private customerservice: CustomerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billservice.getBills()
      .subscribe(data => this.bills = data);
    this.dishservice.getDishes()
      .subscribe(data => this.dish_list = data);
    this.customerservice.getcustomers()
      .subscribe(data => this.customer_list = data);
  }

  get dish() {
    return this.new_bill.get('dishes') as FormArray;
  }

  addDishes() {
    this.dish.push(this.fb.control(''));
  }

  postBill() {
    this.billservice.postBill(this.new_bill.value)
      .subscribe(() => this.getBills());
    this.new_bill = this.fb.group({
      customer: ['', Validators.required],
      dishes: this.fb.array([
        this.fb.control('')
      ])
    })
  }

}
