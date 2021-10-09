import { createReducer, on } from '@ngrx/store';
import * as cartActions from '../actions/cart.actions';
import produce, { original, castDraft } from 'immer';

export const cartFeatureKey = 'cart';

export interface State {
  products: { id: number; count: number }[];
  amount: number;
  count: number;
}

const initialState: State = {
  products: [],
  amount: 0,
  count: 0,
};

export const reducer = createReducer(
  initialState,
  // add product
  on(cartActions.addProduct, (state, { id, price }) => {
    return produce(state, (draftState) => {
      const products = original(draftState.products) || [];
      let existId = products.find((c) => c.id == id);
      if (existId) {
        draftState.products.map((pr) => {
          if (pr.id == existId?.id) {
            pr.count = existId.count + 1;
            return pr;
          }
          return pr;
        });
      } else {
        draftState.products.push({ id, count: 1 });
      }
    });
  }),
  //remove product
  on(cartActions.removeProduct, (state, { product }) => {
    return produce(state, (drafState) => {
      delete drafState.products[product.id];
    });
  }),
  // control quantity of one product
  on(cartActions.amountProductQuantity, (state, { id, count }) => {
    return produce(state, (drafState) => {
      drafState.products[id].count = drafState.products[id].count + count;
      if (drafState.products[id].count <= 0) {
        // delete product
        delete drafState.products[id];
      }
    });
  }),
  // update amount and count
  on(cartActions.updatePropertiesCarts, (state, { amount, count }) => {
    return produce(state, (drafState) => {
      // amoun and quantiy
      drafState.amount = amount;
      drafState.count = count;
    });
  })
);

//  selectors

export const getIdsCart = (state: State) => state.products;
export const getAttrsCart = (state: State) => ({
  count: state.count,
  amount: state.amount,
});
