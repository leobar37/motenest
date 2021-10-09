import { selectRouteData } from '@app/reducers/selectors';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { tap, concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  routerRequestAction,
  routerNavigationAction,
  routerNavigatedAction,
} from '@ngrx/router-store';
import * as npProgress from 'nprogress';
import { concat } from 'rxjs';

@Injectable()
export class LoadingService {
  loading$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(routerRequestAction),
        tap((_) => {
          npProgress.start();
          this.title.setTitle('loading');
        }),
        concatMap((_) =>
          concat(
            this.actions.pipe(
              ofType(routerNavigationAction),
              tap((_) => {
                npProgress.done();
              })
            ),
            this.actions.pipe(
              ofType(routerNavigatedAction),
              tap((_) => {
                npProgress.remove();
              })
            )
          )
        )
      );
    },
    { dispatch: false }
  );
  listenActions$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(routerNavigationAction),
        // concat with the last emission of the router state
        concatLatestFrom(() => this.store.select(selectRouteData)),
        map(([, data]) => {
          if (!data['title']) {
            return 'Inicio';
          }
          return `Redux - ${data['title']}`;
        }),
        tap((titl) => this.title.setTitle(titl))
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions: Actions,
    private title: Title,
    private store: Store
  ) {}
}
