import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  bottomNav = [
    {
      name: 'home',
      to: '/',
    },
    {
      name: 'discover',
      to: '/discover/vendors',
    },
    {
      name: 'cart',
      to: '/cart',
    },
    {
      name: 'profile',
      to: '/profile/me',
    },
  ];
}
