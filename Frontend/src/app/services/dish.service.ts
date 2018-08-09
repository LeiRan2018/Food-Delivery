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

  getDishes(): Observable<Dish[]> {
    return this.http.get(`${this.API}/dishes`).pipe(
      map(res => {return res['data'] as Dish[]})
    );
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get(`${this.API}/dishes/${id}`).pipe(
      map(res => {return res['data'] as Dish})
    )
  }

  postDish(data) {
    return this.http.post(`${this.API}/dishes/create`, data)
  }

  updateDish(id, data) {
    return this.http.put(`${this.API}/dishes/${id}/update`, data)
  }

  deleteDish(id) {
    return this.http.delete(`${this.API}/dishes/${id}`)
  }
  
}