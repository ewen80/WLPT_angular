import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRouting } from './admin.routing';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    adminRouting
  ],
  declarations: [
    UsersComponent
  ]
})
export class AdminModule { }
