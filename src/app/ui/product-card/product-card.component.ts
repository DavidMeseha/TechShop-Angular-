import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IFullProduct } from '../../../types';
import { RouterLink } from '@angular/router';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RatingStarsComponent, CommonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: IFullProduct | null = null;
  @Input() isLiked = false;
  @Input() isSaved = false;
  @Input() inCart = false;
}
