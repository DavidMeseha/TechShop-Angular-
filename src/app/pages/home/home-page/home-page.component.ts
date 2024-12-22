import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
import { DataService } from '../../../services/fetch.service';
import { IFullProduct, User } from '../../../../types';
import { ProductCardComponent } from '../../../ui/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../../../store/user/user.actions';
import {
  selectUser,
  selectUserActions,
} from '../../../store/user/user.selectors';
import { UserState } from '../../../store/app.state';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, ButtonComponent, CommonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  isloadingMore = false;
  products: IFullProduct[] = [];
  lastPage = 1;
  hasNext = true;
  user: User | null = null;

  userActions: {
    saves: string[];
    likes: string[];
    cart: { product: string; quantity: number }[];
  } = {
    likes: [],
    saves: [],
    cart: [],
  };

  constructor(
    private dataService: DataService,
    private store: Store<{ user: UserState }>
  ) {
    this.store.select(selectUser).subscribe((res) => {
      this.user = res;
    });

    this.store.select(selectUserActions).subscribe((res) => {
      this.userActions.saves = res.saves;
      this.userActions.likes = res.likes;
      this.userActions.cart = res.carts;
      console.log(res);
    });
  }

  async loadMoreClick() {
    this.store.dispatch(login({ password: '', email: '' }));
    this.isloadingMore = true;
    this.lastPage += 1;
    this.loadData(this.lastPage);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page: number = 1) {
    this.dataService
      .getData<{
        data: IFullProduct[];
        pages: { current: number; limit: number; hasNext: boolean };
      }>('/api/catalog/homefeed', { limit: 5, page })
      .subscribe({
        next: (response) => {
          this.products = [...this.products, ...response.data];
          this.hasNext = response.pages.hasNext;
        },
        error: (error) => {
          this.isloadingMore = false;
        },
        complete: () => {
          this.isloadingMore = false;
        },
      });
  }

  productIsInCart(product: IFullProduct) {
    return !!this.userActions.cart.find((item) => product._id === item.product);
  }
}
