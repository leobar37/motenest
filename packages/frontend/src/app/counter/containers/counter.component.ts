import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { counterActions } from '../actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCounter from '../reducers/index';

@Component({
  selector: 'app-counter-page',
  template: ` <div class="container_counter">
    <app-counter
      [currentValue]="$counter | async"
      (increment)="increment()"
      (decreement)="decreement()"
      (incrementByAmount)="incrementByAmount($event)"
    ></app-counter>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../styles/counter.styles.scss'],
})
export class CounterComponent implements OnInit {
  $counter: Observable<number>;

  constructor(private store: Store<fromCounter.State>) {
    this.$counter = this.store.pipe(select(fromCounter.selectCountValue));
  }

  ngOnInit(): void {}

  increment() {
    this.store.dispatch(counterActions.aument());
  }
  decreement() {
    this.store.dispatch(counterActions.decrement());
  }
  incrementByAmount(amount: number) {
    this.store.dispatch(counterActions.amountByValue({ value: amount }));
  }
}
