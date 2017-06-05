import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TreeModule } from 'angular-tree-component';

import {
  ModalModule
} from 'ngx-bootstrap'

import { SmartadminModule } from '../../shared/smartadmin.module';

import { MenusComponent } from './menus.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SmartadminModule,
    ModalModule,

    TreeModule

  ],
  declarations: [MenusComponent]
})
export class MenusModule { }
