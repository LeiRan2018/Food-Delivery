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

  constructor(private customerserive: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.customerserive.getcustomers()
      .subscribe(data => this.customers = data);
  }

}
