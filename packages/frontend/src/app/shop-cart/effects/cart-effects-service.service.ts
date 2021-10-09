import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromShopCart from '../reducers/index';
import { Store, select } from '@ngrx/store';
import * as cartActions from '../actions/cart.actions';
import { concatMap, mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { selectProductsfCart, selectShowCart } from '../reducers';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable()
export class CartEffectsServiceService {
  $updateProperties = createEffect(() =>
    this.actions.pipe(
      ofType(
        cartActions.addProduct,
        cartActions.removeProduct,
        cartActions.amountProductQuantity
      ),
      switchMap((_) => {
        return this.store.pipe(select(selectProductsfCart));
      }),
      switchMap((data) => {
        return this.store.pipe(select(selectProductsfCart)).pipe(
          map((items) => {
            const count = items.reduce((acc, arr) => {
              return acc + arr.count;
            }, 0);
            const amount = items.reduce((acc, arr) => {
              const price = arr.product?.price || 0;
              return acc + arr.count * price;
            }, 0);
            return cartActions.updatePropertiesCarts({ count, amount });
          })
        );
      })
    )
  );

  $showNotificationCart = createEffect(
    () =>
      this.actions.pipe(
        ofType(cartActions.addProduct),
        mergeMap(({ id }) =>
          this.store.pipe(select(selectShowCart)).pipe(
            map(() => {
              this.notificationService.success('Correctamente agregado', '', {
                nzDuration: 600,
                nzPlacement: 'bottomLeft',
              });
            })
          )
        )
      ),
    { dispatch: false }
  );
  constructor(
    private actions: Actions,
    private store: Store<fromShopCart.State>,
    private notificationService: NzNotificationService
  ) {}
}
