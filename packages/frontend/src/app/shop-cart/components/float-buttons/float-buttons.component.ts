import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as buttonActions from '../../actions/buttons.actions';
@Component({
  selector: 'app-float-buttons',
  template: `<div class="buttons">
    <nz-card>
      <nz-space>
        <button (click)="openCart()" *nzSpaceItem nz-button nzType="primary">
          <i nz-icon nzType="shopping-cart"> </i>
          cart
        </button>
      </nz-space>
    </nz-card>
  </div>`,
  styleUrls: ['../../styles/floatbutton.styes.scss'],
})
export class FloatButtonsComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {}
  openCart() {
    console.log('open drawer button');

    this.store.dispatch(buttonActions.openCart());
  }
}
