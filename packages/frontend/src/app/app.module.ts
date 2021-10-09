import { DefaultModule } from './default/default.module';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROOT_REDUCERS } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RoutingModule } from './routes.module';
import { MarkdownModule } from 'ngx-markdown';
import { EffectsModule } from '@ngrx/effects';
registerLocaleData(en);

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoadingService } from '@app/core/effects/loading.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(ROOT_REDUCERS, {}),
    StoreDevtoolsModule.instrument({
      name: 'Redux baby :)',
      maxAge: 25,
    }),
    MarkdownModule.forRoot(),
    RoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    EffectsModule.forRoot([LoadingService]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
