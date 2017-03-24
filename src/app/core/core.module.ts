/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule, ErrorHandler } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, HttpModule, BaseRequestOptions } from "@angular/http";

import { fakeBackendProvider } from "../test/_service/fake_backend";
import { AuthenticationGuard, AuthenticationService } from './user/authentication/index';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { ResourceService } from './services/resource.service';
import { MyErrorHandler } from './my-error-handler';
import { AppConfigService } from './app-config.service';
import { BasicAuthenticationHttp } from './basic-authentication-http.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    exports: [ ],
    providers: [
        BaseRequestOptions,
        // MockBackend,  
        // fakeBackendProvider,     //提供自定义模拟后台功能服务
        AuthenticationGuard,
        AuthenticationService,
        UserService,
        RoleService,
        ResourceService,
        AppConfigService,
        BasicAuthenticationHttp,
        // {provide:ErrorHandler,useClass:MyErrorHandler}
    ]
})
export class CoreModule{
}