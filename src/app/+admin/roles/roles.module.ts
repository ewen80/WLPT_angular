import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModalModule
} from 'ng2-bootstrap'

import { SmartadminModule } from '../../shared/smartadmin.module';

import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,

    SmartadminModule,
    ModalModule

  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
