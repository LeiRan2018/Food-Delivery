import { Injectable } from '@angular/core';
import { API_URL } from './api';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  api = `${API_URL}/genres`;

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get(this.api).pipe(
      map(res => {
        return res['data'] as Genre[];
      })
    )
  };

  postGenre(data) {
    return this.http.post(`${this.api}/create`, data)
  }
}
