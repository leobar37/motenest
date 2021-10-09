import { DefaultComponent } from './default/default.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const router: Routes = [
  { component: DefaultComponent, path: '' },
  {
    path: 'counter',
    loadChildren: () =>
      import('./counter/counter.module').then(({ CounterModule }) => {
        return CounterModule;
      }),
    data: {
      title: 'Counter',
    },
  },
  {
    path: 'shoppingcart',
    loadChildren: () =>
      import('./shop-cart/shop-cart.module').then((m) => m.ShopCartModule),
    data: {
      title: 'shop',
    },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: {
      title: 'contact',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
})
export class RoutingModule {}
