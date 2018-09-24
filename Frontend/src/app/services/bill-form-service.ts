import { Injectable } from '@angular/core';
import { BillFormBase } from '../bill/bill-form-base';
import { BillForm } from '../bill/bill-form';
import { DishService } from '../services/dish.service';
import { Dish } from '../models/dish.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from './api';

import { AuthService } from '../auth/auth.service'; 

@Injectable({
    providedIn: 'root'
})
export class BillFormService {
    
    constructor( private dishservice: DishService) {}

    getBillForms() {
        let billforms: BillFormBase<any>[] = [
            new BillForm({
                _id: 'num1',
                label: 'dish1',
                value: 'good',
                order: 1
            }),
            new BillForm({
                _id: 'num2',
                label: 'dish2',
                value: 'bad',
                order: 2
            })
        ];
        return billforms;
    }
}

