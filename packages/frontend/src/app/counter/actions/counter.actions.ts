import { createAction, props } from '@ngrx/store';

export const aument = createAction('[counter]  amount');
export const decrement = createAction('[counter]  decrement');
export const amountByValue = createAction(
  '[counter] amount by value',
  props<{ value: number }>()
);
export const amountByValueMore1 = createAction<
  string,
  [number],
  { value: number }
>('[counter] amount by value more 1', (value: number) => ({
  value: value + 1,
}));
