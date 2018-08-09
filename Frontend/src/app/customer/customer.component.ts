import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];
  new_customer = {first_name: '', last_name: '', address: ''}
  constructor(private customerserive: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerserive.getcustomers()
      .subscribe(data => this.customers = data);
  }

  createCustomer() {
    this.customerserive.postcustomer(this.new_customer)
      .subscribe(() => this.getCustomers())
  }
}
