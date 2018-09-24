import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BillFormBase } from '../bill-form-base';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.css']
})
export class FormBillComponent {
  @Input() billform: BillFormBase<any>;
  @Input() form: FormGroup;
  @Input() dishFormGroup: FormGroup;
  @Input() dish: Dish;

  get isValid() { return this.form.controls[this.billform._id].valid;}
}
