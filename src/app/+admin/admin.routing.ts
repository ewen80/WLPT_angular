import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { ResourceComponent } from './resources/resources.component';

export const adminRoutes: Routes = [
    {
        path: '',
        children:[
            {
                path: 'users', component: UsersComponent
            },
            {
                path: 'roles', component: RolesComponent
            },
            {
                path: 'resources', component: ResourceComponent
            }
        ]
        
    }
];

export const adminRouting = RouterModule.forChild(adminRoutes);

