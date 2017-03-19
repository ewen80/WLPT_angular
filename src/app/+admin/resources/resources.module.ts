import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModalModule
} from 'ng2-bootstrap'

import { SmartadminModule } from '../../shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,

    SmartadminModule,
    ModalModule

  ],
  declarations: []
})
export class RolesModule { }
