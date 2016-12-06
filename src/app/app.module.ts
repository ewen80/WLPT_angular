import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from "@angular/http";

import { SmartadminModule } from './shared/smartadmin.module'
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CoreModule } from "./core/core.module";

import { fakeBackendProvider } from "./test/_service/fake_backend";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,

    routing,
    CoreModule,
    SmartadminModule //系统所有用到的模块及provider
    // SmartadminModule.forRoot(),  
  ],
  providers: [
    MockBackend,  
    BaseRequestOptions,
    fakeBackendProvider     //提供自定义模拟后台功能服务
    ], 
  bootstrap: [AppComponent]
})
export class AppModule {

}
