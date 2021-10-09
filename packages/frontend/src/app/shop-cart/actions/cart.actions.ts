import { createAction, props } from '@ngrx/store';
import { Product } from '../models/Product';
/// add  product on cart

export const addProduct = createAction<
  string,
  [Product],
  { id: number; price: number }
>('[cart] add product on cart', (product: Product) => {
  return {
    id: product.id,
    price: product.price,
  };
});
// remove product on cart

export const removeProduct = createAction(
  '[cart] remove product from cart',
  props<{ product: Product }>()
);
// total sum prrce on cart

export const amountProductQuantity = createAction(
  '[cart] add or less product',
  props<{ id: number; count: number }>()
);

// update amount and count

export const updatePropertiesCarts = createAction(
  '[cart] update properties of cart',
  props<{ amount: number; count: number }>()
);

// get product of the card
