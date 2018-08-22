import { Injectable } from '@angular/core';
import { API_URL } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../models/genre.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  api = `${API_URL}/genres`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get(this.api).pipe(
      map(res => {
        return res['data'] as Genre[];
      })
    )
  };

  getGenre(id: string): Observable<Genre> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map(res => { return res['data'] as Genre; })
    )
  };

  postGenre(data) {
    return this.http.post(`${this.api}/create`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  };

  updateGenre(id, data) {
    return this.http.put(`${this.api}/${id}/update`, data, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  };

  deleteGenre(id) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
  }
}
