import { createReducer, on, createSelector } from '@ngrx/store';
import { counterActions } from '../actions';
import produce from 'immer';
export const featureKey = 'counter';
export interface State {
  value: number;
  lastChangue: string;
}

const initialState: State = {
  value: 0,
  lastChangue: '',
};

export const reducer = createReducer(
  initialState,
  on(counterActions.aument, (state, action) => ({
    ...state,
    value: state.value + 1,
  })),
  on(counterActions.decrement, (state, action) => ({
    ...state,
    value: state.value - 1,
  })),
  on(counterActions.amountByValue, (state, action) => ({
    ...state,
    value: state.value + action.value,
  }))
);
