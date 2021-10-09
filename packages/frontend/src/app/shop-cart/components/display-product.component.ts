import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../models/Product';
import { State } from '../reducers';
import * as cartActions from '../actions/cart.actions';

@Component({
  selector: 'app-display-product',
  template: ` <nz-card nzHoverable class="product shadow-lg" [nzCover]="cover">
    <ng-template #cover>
      <div class="image">
        <img class="" [src]="product.image" />
      </div>
    </ng-template>
    <h3>{{ product.title }}</h3>
    <p class="price">
      {{ product.price | currency: 'PEN' }}
    </p>

    <p>
      <nz-button-group>
        <button
          nz-button
          (click)="addToCart(product)"
          nzType="primary"
          nzDanger
          nzSize="large"
        >
          add to cart
        </button>
      </nz-button-group>
    </p></nz-card
  >`,
  styleUrls: ['../styles/product.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayProductComponent implements OnInit {
  @Input() product!: Product;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}
  addToCart(product: Product) {
    this.store.dispatch(cartActions.addProduct(product));
  }
}
