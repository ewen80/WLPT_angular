import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModalModule
} from 'ng2-bootstrap'

import { SmartadminModule } from '../../shared/smartadmin.module';

import { ResourceComponent } from './resources.component';

@NgModule({
  imports: [
    CommonModule,

    SmartadminModule,
    ModalModule

  ],
  declarations: [ ResourceComponent ]
})
export class ResourceModule { }
