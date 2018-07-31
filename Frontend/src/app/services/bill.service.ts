import { Injectable } from '@angular/core';
import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  API = API_URL;
  constructor(private http: HttpClient) { }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.API}/bills`).pipe(
      map(res => {
        return res['data'] as Bill[];
      })
    );
  }
}
