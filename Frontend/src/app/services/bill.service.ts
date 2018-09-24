import { Injectable } from '@angular/core';
import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from './api';

import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class BillService {
  api = `${API_URL}/bills`;
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.api}`).pipe(
      map(res => {return res['data'] as Bill[];})
    );
  }

  getBill$(id: string): Observable<Bill> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map(res => {return res['data'] as Bill})
    );
  }

  postBill(data) {
    return this.http.post(`${this.api}/create`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  updateBill(id, data) {
    return this.http.put(`${this.api}/${id}/update`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  deleteBill(id) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }
}
