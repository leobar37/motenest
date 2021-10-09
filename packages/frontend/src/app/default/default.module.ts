import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DefaultComponent } from './default.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MarkdownModule } from 'ngx-markdown';
const zorro = [
  NzLayoutModule,
  NzGridModule,
  NzButtonModule,
  NzTypographyModule,
  NzTableModule,
  NzIconModule,
  NzCardModule,
  NzDividerModule,
];

@NgModule({
  declarations: [DefaultComponent, NavbarComponent],
  imports: [CommonModule, MarkdownModule.forChild(), zorro, RouterModule],
  exports: [DefaultComponent, NavbarComponent],
  providers: [],
})
export class DefaultModule {}
