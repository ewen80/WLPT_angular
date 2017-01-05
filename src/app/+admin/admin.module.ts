import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRouting } from './admin.routing';
import { UsersModule } from './users/users.module';
import { fakeBackendProvider } from "../test/_service/fake_backend";

@NgModule({
  imports: [
    CommonModule,
    adminRouting,

    UsersModule
  ],
  declarations: [  ],
  providers:[
    // fakeBackendProvider
  ]
  
})
export class AdminModule { }
