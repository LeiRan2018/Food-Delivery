import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill.model';
import { BillService } from '../services/bill.service';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  bills: Bill[];

  constructor(private billservice: BillService) { }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billservice.getBills()
      .subscribe(data => this.bills = data);
  }

}
