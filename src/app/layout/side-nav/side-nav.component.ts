import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  menu = [
    {
      name: 'home',
      to: '/',
    },
    {
      name: 'feeds',
      to: '/feeds',
    },
    {
      name: 'profile',
      to: `/profile/me`,
    },
    {
      name: 'discover',
      sup: [
        {
          name: 'categories',
          to: `/discover/categories`,
        },
        {
          name: 'vendors',
          to: `/discover/vendors`,
        },
        {
          name: 'tags',
          to: `/discover/tags`,
        },
      ],
    },
    {
      name: 'cart',
      to: `/cart`,
    },
  ];
}
