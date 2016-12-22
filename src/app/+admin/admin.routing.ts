import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from "./users/users.component";

export const adminRoutes: Routes = [
    {
        path: '',
        children:[
            {
                path: 'users',component: UsersComponent
            }
        ]
        
    }
];

export const adminRouting = RouterModule.forChild(adminRoutes);

