import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { ResourceComponent } from './resources/resources.component';
import { MenusComponent } from "app/+admin/menus/menus.component";

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
                path: 'resources', 
                children:[
                    {
                        path: '',
                        component: ResourceComponent
                    },
                    {
                        path: 'menus',
                        component: MenusComponent
                    }
                ],
                
            }
        ]
        
    }
];

export const adminRouting = RouterModule.forChild(adminRoutes);

