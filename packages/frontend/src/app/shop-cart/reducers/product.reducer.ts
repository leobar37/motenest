import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../models';
import * as productActions from '../actions/product.actions';
export const feautureKey = 'prodcutReducer';

export interface State extends EntityState<Product> {
  selectProductId: string | null;
}

const sortByPrice = (a: Product, b: Product) => {
  return a.price - b.price;
};

export const adapter: EntityAdapter<Product> = createEntityAdapter({
  sortComparer: sortByPrice,
});

export const initialState: State = adapter.getInitialState({
  selectProductId: null,
});

export const productReducer = createReducer(
  initialState,
  //
  on(productActions.addPrduct, (state: State, { product }) => {
    return adapter.addOne(product, state);
  }),
  //
  on(productActions.deleteProduct, (state: State, { id }) => {
    return adapter.removeOne(id, state);
  }),
  //
  on(productActions.deleteProductByPredicate, (state: State, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  //
  on(productActions.loadProducts, (state: State, { products }) => {
    return adapter.setAll(products, state);
  }),
  //
  on(productActions.addUsers, (state: State, { products }) => {
    return adapter.addMany(products, state);
  }),
  
);

// obtain selector of adapter

export const {
  selectAll: selectAllProduts,
  selectEntities: selectDictionaryProducts,
  selectTotal: selectTotalProducts,
  selectIds: selectProductIds,
} = adapter.getSelectors();

export const selectProductId = (state: State) => state.selectProductId;
