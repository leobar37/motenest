import * as buttonsActions from '../actions/buttons.actions';
import { createReducer, on } from '@ngrx/store';
export const featureKey = 'buttons';

export interface State {
  showCart: boolean;
}

const initialState: State = {
  showCart: false,
};

export const reducer = createReducer(
  initialState,
  on(buttonsActions.openCart, (state) => {
    return {
      ...state,
      showCart: true,
    };
  }),
  //
  on(buttonsActions.closeCart, (state) => {
    return {
      ...state,
      showCart: false,
    };
  })
);

export const selectShowCart = (state: State) => state.showCart;
