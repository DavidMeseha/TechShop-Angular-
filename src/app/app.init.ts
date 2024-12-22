import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, tap } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    const apiUrl = environment.apiUrl;
    const token = localStorage.getItem('access');
    const createdAt = localStorage.getItem('createdAt');

    console.log(new Date().getDate() - new Date(createdAt ?? '').getDate());

    const isExpired = createdAt
      ? new Date().getDate() - new Date(createdAt).getDate() > 29 / (60 * 1000)
      : false;

    localStorage.removeItem('createdAt');

    if (!token || (token && isExpired)) {
      return firstValueFrom(
        this.http
          .get<{ user: User; token: string }>(`${apiUrl}/api/auth/guest`)
          .pipe(
            tap((response) => {
              localStorage.setItem('access', response.token);
              console.log(response);
            }),
            catchError((error) => error)
          )
      );
    } else if (token && createdAt && !isExpired) {
      return firstValueFrom(
        this.http
          .get<{ user: User; token: string }>(`${apiUrl}/api/auth/refreshToken`)
          .pipe(
            tap((response) => {
              localStorage.setItem('access', response.token);
              localStorage.setItem('createdAt', new Date().toISOString());
              console.log(response);
            }),
            catchError((error) => error)
          )
      );
    }
  }
}
