import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent as pageCounterComponent } from './containers/counter.component';
import * as fromCounter from './reducers/index';
import { CounterComponent } from './components/counter/counter.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
const zorro = [
  NzCardModule,
  NzButtonModule,
  NzInputModule,
  NzInputNumberModule,
  NzSpaceModule,
];
@NgModule({
  declarations: [pageCounterComponent, CounterComponent],
  imports: [
    zorro,
    FormsModule,
    CommonModule,
    CounterRoutingModule,
    StoreModule.forFeature(fromCounter.counterfetureKey, fromCounter.reducers),
  ],
})
export class CounterModule {}
