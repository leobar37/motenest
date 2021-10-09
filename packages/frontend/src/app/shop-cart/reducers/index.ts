import { Product } from '../models/Product';
import {
  combineReducers,
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import * as fromProduct from './product.reducer';
import * as fromCart from './cart.reducer';
import * as fromButtons from './buttons.reducers';
export const shopCartFeatureKey = 'shopcart';

export interface ShopCartState {
  [fromProduct.feautureKey]: fromProduct.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromButtons.featureKey]: fromButtons.State;
}

export interface State extends fromRoot.State {
  [shopCartFeatureKey]: ShopCartState;
}

const reducers_: ActionReducerMap<ShopCartState, Action> = {
  [fromProduct.feautureKey]: fromProduct.productReducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromButtons.featureKey]: fromButtons.reducer,
};

export function reducers(state: ShopCartState, action: Action) {
  return combineReducers(reducers_)(state, action);
}

const selectShopState =
  createFeatureSelector<ShopCartState>(shopCartFeatureKey);

// select slice state
const selectProdcutsEntityState = createSelector<
  State,
  ShopCartState,
  fromProduct.State
>(selectShopState, (state: ShopCartState) => state['prodcutReducer']);

const selectCartState = createSelector(
  selectShopState,
  (state: ShopCartState) => {
    return state[fromCart.cartFeatureKey];
  }
);

// selectors for product
export const selectAllProducts = createSelector(
  selectProdcutsEntityState,
  (state) => {
    return fromProduct.selectAllProduts(state);
  }
);

const selectProductEntities = createSelector(
  selectProdcutsEntityState,
  fromProduct.selectDictionaryProducts
);

const selectCurrentProductId = createSelector(
  selectProdcutsEntityState,
  fromProduct.selectProductId
);

export const selectTotalProducts = createSelector(
  selectProdcutsEntityState,
  fromProduct.selectTotalProducts
);

export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectCurrentProductId,
  (entities, productId) => {
    return productId && entities[productId];
  }
);

// selectors for cart

export const selectCartIds = createSelector(
  selectCartState,
  fromCart.getIdsCart
);

// select products for ids
export const selectProductsfCart = createSelector(
  selectCartIds,
  selectProductEntities,
  (productsCart, products) => {
    return productsCart.map((pr) => ({
      product: products[pr.id],
      count: pr.count,
    }));
  }
);

// select attrs
export const selectAttrsOfCart = createSelector(
  selectCartState,
  fromCart.getAttrsCart
);

/*=============================================
=            Buttons            =
=============================================*/
const selectButtonState = createSelector(
  selectShopState,
  (state) => state['buttons']
);

export const selectShowCart = createSelector(
  selectButtonState,
  fromButtons.selectShowCart
);
