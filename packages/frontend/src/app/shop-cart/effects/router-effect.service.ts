import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { routerNavigationAction } from '@ngrx/router-store';
import { createEffect, concatLatestFrom, Actions, ofType } from '@ngrx/effects';
import { Title } from '@angular/platform-browser';
import { selectRouteData } from '@app/reducers/selectors';
import { Store } from '@ngrx/store';
@Injectable()
export class RouterEffectService {
  constructor(
    private title: Title,
    private actions: Actions,
    private store: Store
  ) {}
}
