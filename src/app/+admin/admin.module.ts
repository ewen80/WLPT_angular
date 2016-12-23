import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRouting } from './admin.routing';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [
    CommonModule,
    adminRouting,

    UsersModule
  ],
  declarations: [  ]
})
export class AdminModule { }
