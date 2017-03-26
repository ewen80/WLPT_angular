/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule, ErrorHandler, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, HttpModule, BaseRequestOptions } from "@angular/http";

import { fakeBackendProvider } from "../test/_service/fake_backend";
import { AuthenticationGuard, AuthenticationService } from './services/authentication/index';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { ResourceService } from './services/resource.service';
import { BasicAuthenticationHttp } from './services/basic-authentication-http.service';

import { AppConfig } from './app.config';

export function initConfig(config: AppConfig){
    return () => config.load();
}

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
        BasicAuthenticationHttp,
        AppConfig,
        {
            provide: APP_INITIALIZER, useFactory:initConfig, deps: [AppConfig], multi: true
        }
        // {provide:ErrorHandler,useClass:MyErrorHandler}
    ]
})
export class CoreModule{
}