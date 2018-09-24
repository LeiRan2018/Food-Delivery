import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill.model';
import { BillService } from '../services/bill.service';
import { Dish } from '../models/dish.model';
import { DishService } from '../services/dish.service';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BillFormService } from '../services/bill-form-service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  bills: Bill[];
  dish_list: Dish[];
  customer_list: Customer[];
  created: boolean;
  edited: boolean = false;
  new_bill: FormGroup;
  buildDietaryRequirements(arr) {
    return this.fb.array(arr.map(x => this.fb.group(x)));
  }

  constructor(
    public billservice: BillService,
    private dishservice: DishService,
    private customerservice: CustomerService,
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private bf: BillFormService
  ) {
    this.new_bill = this.fb.group({
      dishes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billservice.getBills()
      .subscribe(data => {
        this.bills = data;
      });
    this.dishservice.getDishes()
      .subscribe(data => {
        this.dish_list = data;
        this.dish_list.forEach(element =>{
          (<FormArray>this.new_bill.get('dishes')).push(this.fb.group({
            id:[element._id],
            name: [element.name],
            number: ['']
          }))
        })
      });
    this.customerservice.getcustomers()
      .subscribe(data => this.customer_list = data);
  }

  postBill() {
    this.billservice.postBill(this.new_bill.value)
      .subscribe(() => this.getBills());
    // this.new_bill.reset();
  }

  goBack() {
    this.location.back();
  }

  edit() {
    this.edited = true;
  }

  updateBill() {
    const id = this.auth.userProfile.sub;
    this.billservice.updateBill(id, this.new_bill.value)
      .subscribe(() => this.getBills());
    this.edited = false;
  }

  delete(id) {
    this.billservice.deleteBill(id)
      .subscribe();
    this.created = false;
  }

}
