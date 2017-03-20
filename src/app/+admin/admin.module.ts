import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRouting } from './admin.routing';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ResourceModule } from './resources/resources.module';

@NgModule({
  imports: [
    CommonModule,
    adminRouting,

    UsersModule,
    RolesModule,
    ResourceModule
  ],
  declarations: [  ],
  providers:[
    // fakeBackendProvider
  ]
  
})
export class AdminModule { }
