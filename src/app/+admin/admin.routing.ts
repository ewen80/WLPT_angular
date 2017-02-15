import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";

export const adminRoutes: Routes = [
    {
        path: '',
        children:[
            {
                path: 'users',component: UsersComponent
            },
            {
                path: 'roles',component: RolesComponent
            }
        ]
        
    }
];

export const adminRouting = RouterModule.forChild(adminRoutes);

