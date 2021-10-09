import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShopCartRoutingModule } from './shop-cart-routing.module';
import * as fromShopCart from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import effects from './effects';
import { ProductsComponent } from './containers/products.component';
import { DisplayProductComponent } from './components/display-product.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearhProductComponent } from './components/searh-product/searh-product.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CartComponent } from './components/cart/cart.component';
import { FloatButtonsComponent } from './components/float-buttons/float-buttons.component';
import { PortalModule } from '@angular/cdk/portal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
const zorro = [
  NzCardModule,
  NzButtonModule,
  NzSpaceModule,
  NzBadgeModule,
  NzGridModule,
  NzInputModule,
  NzFormModule,
  NzIconModule,
  NzDrawerModule,
  NzTableModule,
  NzTypographyModule,
  NzNotificationModule,
  NzInputNumberModule,
];

const MATERIAL = [PortalModule, FormsModule];
@NgModule({
  declarations: [
    ProductsComponent,
    DisplayProductComponent,
    SearhProductComponent,
    CartComponent,
    FloatButtonsComponent,
  ],
  imports: [
    CommonModule,
    ShopCartRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromShopCart.shopCartFeatureKey,
      fromShopCart.reducers
    ),
    zorro,
    EffectsModule.forFeature(effects),
    MATERIAL,
  ],
})
export class ShopCartModule {}
