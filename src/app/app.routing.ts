/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';

import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import { AuthenticationGuard } from "./core/user/authentication/authentication-guard.service";
import { LoginComponent } from './shared/user/login/login.component';

import { UsersComponent } from './+admin/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent, //系统总布局组件
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: './+home/home.module#HomeModule',    //延迟加载home模块
                canLoad: [ AuthenticationGuard ]    //登录用户延迟加载home模块
            },
            {
                path: 'admin',
                // component: UsersComponent
                loadChildren: './+admin/admin.module#AdminModule'    //延迟加载admin模块
            }
        ]
    },
    {
        path: 'login',  //登录路由
        component: LoginComponent
    }  
];

export const routing = RouterModule.forRoot(routes);
