import { feautureRouterKey } from '@app/globals/features';
import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

const selectRouter =
  createFeatureSelector<RouterReducerState>(feautureRouterKey);

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectRouteParam,
  selectQueryParams,
  selectUrl,
  selectRouteData,
} = getSelectors(selectRouter);
