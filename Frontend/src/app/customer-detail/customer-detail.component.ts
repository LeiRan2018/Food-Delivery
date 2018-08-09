import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
  new_customer = {first_name: '', last_name: '', address: ''}
  constructor(
    private route: ActivatedRoute,
    private customerservice: CustomerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerservice.getcustomer(id)
      .subscribe(data => this.customer = data)
  }

  updateCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerservice.updatecustomer(id, this.new_customer)
      .subscribe(() => this.getCustomer());
    this.new_customer = {first_name: '', last_name:'', address: ''}
  }

  goBack() {
    this.location.back();
  }

  delete(id) {
    this.customerservice.deletecustomer(id)
      .subscribe(() => this.goBack())
  }

}
