import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill.model';
import { BillService } from '../services/bill.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {
  bill: Bill;
  dish_list: Dish[];
  customer_list: Customer[];

  new_bill = this.fb.group({
    customer: [''],
    dishes: this.fb.array([this.fb.control('')])
  })
  constructor(
    private billservice: BillService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private dishservice: DishService,
    private customerservice: CustomerService
  ) { }

  ngOnInit() {
    this.getBill();
  }

  getBill() {
    const id = this.route.snapshot.paramMap.get('id');
    this.billservice.getBill$(id)
      .subscribe(data => this.bill = data)
    this.dishservice.getDishes()
      .subscribe(data => this.dish_list = data);
    this.customerservice.getcustomers()
      .subscribe(data => this.customer_list = data);
  }

  goBack() {
    this.location.back();
  }

  get dish() {
    return this.new_bill.get('dishes') as FormArray;
  }

  addDishes() {
    this.dish.push(this.fb.control(''));
  }

  updateBill() {
    const id = this.route.snapshot.paramMap.get('id');
    this.billservice.updateBill(id, this.new_bill.value)
      .subscribe(() => this.getBill());
    this.new_bill = this.fb.group({
      customer: [''],
      dishes: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  delete(id) {
    this.billservice.deleteBill(id)
      .subscribe(() => this.goBack());
  }

}
