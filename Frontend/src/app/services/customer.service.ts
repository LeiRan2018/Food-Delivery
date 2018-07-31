import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API = API_URL;
  constructor(private http: HttpClient) { }
  getcustomers(): Observable<Customer[]> {
    return this.http.get(`${this.API}/customers`).pipe(
        map(res => {
          return res['data'] as Customer[];
        })
    );
  }
}
