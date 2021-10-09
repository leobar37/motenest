import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ProductServiceService } from '../services/product-service.service';
import * as productActions from '../actions/product.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from '../models';

@Injectable()
export class BooksEfectsService {
  loadProducts$ = createEffect(() =>
    this.actions.pipe(
      ofType(productActions.addProductsInfo),
      mergeMap(({ limit, sort }) => {
        return this.productService.searchProducts({ limit, sort }).pipe(
          map((data) => {
            let products = data as Product[];
            return productActions.loadProducts({ products });
          })
        );
      })
    )
  );

  constructor(
    private actions: Actions,
    private productService: ProductServiceService
  ) {}
}
