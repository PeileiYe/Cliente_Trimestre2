import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private readonly baseUrl = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) {}

  // GET
  getAll(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl);
  } 

  // POST
  create(payload: Omit<Serie, 'id'>): Observable<Serie> {
    return this.http.post<Serie>(this.baseUrl, payload);
  }
}
