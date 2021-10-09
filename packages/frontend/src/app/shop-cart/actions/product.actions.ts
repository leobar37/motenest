import { Product } from '../models';
import { createAction, props } from '@ngrx/store';
import { Predicate, EntityMap } from '@ngrx/entity';

export const addProductsInfo = createAction(
  '[prducts/api]  add products info',
  props<{ limit: number; sort: 'desc' | 'asc' }>()
);
export const loadProducts = createAction(
  '[products/api] load products',
  props<{ products: Product[] }>()
);

export const addPrduct = createAction(
  '[Products/Api]',
  props<{ product: Product }>()
);

// add users

export const addUsers = createAction(
  '[Products/Api] add users',
  props<{ products: Product[] }>()
);

export const upsertProduct = createAction(
  '[Products/Api]',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Products/Api] delete product',
  props<{ id: string }>()
);

export const deleteProductByPredicate = createAction(
  '[Products/Api] delete products by predicate',
  props<{ predicate: Predicate<Product> }>()
);

export const mapUsers = createAction(
  '[Products/Api] map users',
  props<{ enityMap: EntityMap<Product> }>()
);

export const getProductsByIds = createAction(
  '[Products/api] get products by ids',
  props<{ ids: number[] }>()
);
