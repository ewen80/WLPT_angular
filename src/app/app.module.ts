import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SmartadminModule } from './shared/smartadmin.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CoreModule } from "./core/core.module";

// import { AdminModule } from './+admin/admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    CoreModule,

    SmartadminModule.forRoot(), //系统所有用到的模块及provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
