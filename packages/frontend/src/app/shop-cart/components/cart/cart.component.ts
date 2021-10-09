import { selectAttrsOfCart } from '../../reducers/index';
import { Product } from '../../models/Product';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectProductsfCart } from '../../reducers';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../styles/cart.component.scss'],
})
@UntilDestroy()
export class CartComponent implements OnInit {
  constructor(private store: Store<State>) {}
  products$ = this.store.pipe(select(selectProductsfCart));
  products: { product: Product | undefined; count: number }[] = [];
  attrs$ = this.store.pipe(select(selectAttrsOfCart));

  ngOnInit(): void {
    this.products$.pipe(untilDestroyed(this)).subscribe({
      next: (arr) => {
        this.products = arr;
      },
    });
  }
}
