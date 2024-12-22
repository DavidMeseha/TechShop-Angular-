import { Component } from '@angular/core';
import { UserState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.selectors';
import { User } from '../../../types';
import { CommonModule } from '@angular/common';
import { login, logout } from '../../store/user/user.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: User | null = null;
  showUserMenu = false;

  constructor(private store: Store<{ user: UserState }>) {
    this.store.select(selectUser).subscribe((res) => {
      this.user = res;
    });
  }

  toggleMenu = () => (this.showUserMenu = !this.showUserMenu);

  onLoginClick() {
    this.store.dispatch(
      login({ email: 'davidmmyh2@gmail.com', password: '123456789' })
    );
  }

  onLogoutClick() {
    this.store.dispatch(logout());
  }
}
