import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, {
      params,
    });
  }
}
