import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModalModule
} from 'ng2-bootstrap'

import { SmartadminModule } from '../../shared/smartadmin.module';

import { RolesComponent } from './roles.component';

@NgModule({
  imports: [
    CommonModule,

    SmartadminModule,
    ModalModule

  ],
  declarations: [RolesComponent]
})
export class RolesModule { }
