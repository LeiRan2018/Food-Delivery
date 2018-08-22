import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import { API_URL } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class DishService {
  api = `${API_URL}/dishes`;
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(`${this.api}`).pipe(
      map(res => {return res['data'] as Dish[]})
    );
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map(res => {return res['data'] as Dish})
    )
  }

  postDish(data) {
    return this.http.post(`${this.api}/create`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  }

  updateDish(id, data) {
    return this.http.put(`${this.api}/${id}/update`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  }

  deleteDish(id) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  }
  
}