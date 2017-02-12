/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule, ErrorHandler } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, BaseRequestOptions } from "@angular/http";

import { fakeBackendProvider } from "../test/_service/fake_backend";
import { AuthenticationGuard, AuthenticationService } from './user/authentication/index';
import { UserService } from './user/user.service';
import { MyErrorHandler } from './my-error-handler';
import { AppConfig } from './app-config.service';

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
        AppConfig,
        {provide:ErrorHandler,useClass:MyErrorHandler}
    ]
})
export class CoreModule{
}