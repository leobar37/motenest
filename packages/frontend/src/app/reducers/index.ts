import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { feautureRouterKey } from '@app/globals/features';
export interface State {
  [feautureRouterKey]: RouterReducerState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers', {
  factory: () => ({
    [feautureRouterKey]: routerReducer,
  }),
});
