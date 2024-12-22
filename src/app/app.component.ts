import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { HeaderComponent } from './layout/header/header.component';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';
import { Store } from '@ngrx/store';
import { UserState } from './store/app.state';
import { checkToken, userActions } from './store/user/user.actions';
import { isPlatformBrowser } from '@angular/common';
import UserService from './services/auth.services';
import { selectUser } from './store/user/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavComponent,
    HeaderComponent,
    BottomNavComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private refreshInterval: any;
  constructor(
    private store: Store<{ user: UserState }>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.store.dispatch(checkToken());
    this.store.select(selectUser).subscribe((res) => {
      this.store.dispatch(userActions());
      if (res?.isRegistered) {
        this.startTokenRefresh();
      }
    });
  }

  private startTokenRefresh() {
    this.refreshInterval = setInterval(() => {
      this.userService.refreshToken().subscribe({
        next: (response) => {
          localStorage.setItem('access', response.token);
          localStorage.setItem('createdAt', new Date().toISOString());
          console.error('refreshed token');
        },
        error: (error) => {
          clearInterval(this.refreshInterval);
        },
      });
    }, 28 * 60 * 1000);
  }
}
