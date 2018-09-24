import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillFormBase } from '../bill/bill-form-base';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class BillFormControlService {

  constructor() { }
  toFormGroup(billforms: BillFormBase<any>[] ) {
    let group: any = {};
  
    billforms.forEach(billform => {
        group[billform._id] = billform.required? new FormControl(billform.value || '', Validators.required)
                                               : new FormControl(billform.value || '');
    });
    return new FormGroup(group);
  }

  toDishFormGroup(dish_list: Dish[]) {
    let group: any = {};
   
    dish_list.forEach(dish => {
      group[dish._id] = new FormControl(dish.name);
    });
    return new FormGroup(group);
  }
}
