import * as frommRoot from 'src/app/reducers';
import * as fromCounter from './counter.reducer';

import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export const counterfetureKey = 'counter';

export interface CounterState {
  [fromCounter.featureKey]: fromCounter.State;
}

export interface State extends frommRoot.State {
  [counterfetureKey]: CounterState;
}
// select feature top level
export const selectCounterState = createFeatureSelector<State, CounterState>(
  counterfetureKey
);

export const selectCountValue = createSelector(
  selectCounterState,
  (state: CounterState) => state['counter'].value
);

export function reducers(state: CounterState, action: Action) {
  return combineReducers({
    [fromCounter.featureKey]: fromCounter.reducer,
  })(state, action);
}
