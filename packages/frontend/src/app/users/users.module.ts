import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterComponent } from './components/form-register.component';
import { ListContactsComponent } from './components/list-contacts.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
// services
import { ConctactService } from './services/userstorage.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
const zorro = [
  NzFormModule,
  NzInputModule,
  NzGridModule,
  NzInputNumberModule,
  NzCardModule,
  NzButtonModule,
  NzTypographyModule,
  NzSpaceModule,
  NzMessageModule,
  NzIconModule,
  NzPopconfirmModule,
];

const material = [MatListModule, MatDividerModule];

@NgModule({
  declarations: [UsersComponent, FormRegisterComponent, ListContactsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    zorro,
    FormsModule,
    ReactiveFormsModule,
    material,
  ],
  providers: [ConctactService],
})
export class UsersModule {}
