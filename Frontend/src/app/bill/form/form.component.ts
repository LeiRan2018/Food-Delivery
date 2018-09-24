import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BillFormBase } from '../bill-form-base';
import { BillFormControlService } from '../../services/bill-form-control.service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() billforms: BillFormBase<any>[] = [];
  @Input() dish_list: Dish[] = [];
  // @Input() dish_list: string;
  test: boolean = (this.dish_list) ? true : false;

  form: FormGroup;
  // dishFormGroup: FormGroup;
  dishFormGroup: Dish[];
  payLoad = '';
  group = this.dish_list;

  constructor(private bcs: BillFormControlService) { }

  ngOnInit() {
    this.form = this.bcs.toFormGroup(this.billforms);
    // this.dishFormGroup = this.getdish();
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

  getdish() {
    // let group: any = {};
    var group = this.dish_list;

    // this.dish_list.forEach(dish => {
    //   group[dish._id] = new FormControl(dish.name);
    // });
    // return new FormGroup(group);
    // for (let dish of this.dish_list) {
    //   group[dish._id] = new FormControl(dish.name)
    // }
    // return new FormGroup(group);
    return group
  }

}
