import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getDish(): Observable<Dish[]> {
    return this.http.get(`${this.API}/dishes`).pipe(
      map(res => {
        return res['data'] as Dish[];
      }));
  }
}
