import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserAllActions } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  guestToken(): Observable<{ user: User; token: string }> {
    return this.http.get<{ user: User; token: string }>(
      `${this.apiUrl}/api/auth/guest`
    );
  }

  checkToken(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/auth/check`);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(
      `${this.apiUrl}/api/auth/login`,
      credentials
    );
  }

  register(userDate: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/api/auth/register`,
      { ...userDate, gender: 'male' }
    );
  }

  allActions(): Observable<UserAllActions> {
    return this.http .get<UserAllActions>(
      `${this.apiUrl}/api/common/allActions`,
      {}
    );
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/api/auth/refreshToken`,
      {}
    );
  }

  logout(): Observable<{ user: User; token: string }> {
    return this.http.get<{ user: User; token: string }>(
      `${this.apiUrl}/api/auth/guest`,
      {}
    );
  }
}
