import { FloatButtonsComponent } from '../components/float-buttons/float-buttons.component';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { addProductsInfo } from '../actions/product.actions';
import { Store, select } from '@ngrx/store';
import { selectAllProducts, State, selectShowCart } from '../reducers';
import {
  Portal,
  DomPortal,
  ComponentPortal,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import { CartComponent } from '../components/cart/cart.component';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { filter, tap, map, mergeMap } from 'rxjs/operators';
import { concat, iif, merge, of, EMPTY } from 'rxjs';
import * as actionButtons from '../actions/buttons.actions';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
@Component({
  selector: 'app-products',
  template: `
    <div nz-row class="w-100" nzJustify="center">
      <div nz-col nzSpan="10" class="my-2">
        <app-searh-product></app-searh-product>
      </div>
      <div nz-col nzSpan="16">
        <div nz-row class="w-100 mx-auto mt-4" nzJustify="center" nzGutter="25">
          <app-display-product
            [product]="item"
            *ngFor="let item of products$ | async"
          ></app-display-product>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
@UntilDestroy()
export class ProductsComponent implements OnInit {
  private flotButtons!: ComponentPortal<FloatButtonsComponent>;

  private drawerRef!: NzDrawerRef;

  constructor(
    private store: Store<State>,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private drawerService: NzDrawerService
  ) {}
  products$ = this.store.pipe(select(selectAllProducts));
  private cartDrawer$ = this.store.pipe(select(selectShowCart));

  private openFloatButtons() {
    const host = new DomPortalOutlet(
      document.querySelector('body') as Element,
      this.factoryResolver,
      this.appRef,
      this.injector
    );

    if (!this.flotButtons) {
      this.flotButtons = new ComponentPortal(
        FloatButtonsComponent,
        this.viewContainerRef
      );
      host.attach(this.flotButtons);
    }
  }
  // controller cart
  private controllerCart() {
    const openDrawer = () => {
      this.drawerRef = this.drawerService.create({
        nzContent: CartComponent,
        nzPlacement: 'right',
        nzWidth: '700px',
      });
      return this.drawerRef.afterClose.pipe(
        tap((_) => {
          this.store.dispatch(actionButtons.closeCart());
        })
      );
    };
    const open$ = this.cartDrawer$.pipe(
      filter((val) => !!val),
      mergeMap((_) => openDrawer())
    );
    const close$ = this.cartDrawer$.pipe(filter((val) => !val));
    concat(open$, close$).pipe(untilDestroyed(this)).subscribe();
  }
  ngOnInit(): void {
    this.openFloatButtons();
    this.controllerCart();
    this.store.dispatch(addProductsInfo({ limit: 50, sort: 'asc' }));
  }
}
