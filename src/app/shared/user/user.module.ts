

import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginInfoComponent} from "./login-info/login-info.component";
import {LogoutComponent} from "./logout/logout.component";
import {UserService} from "./user.service";

@NgModule({
  imports: [CommonModule],
  declarations: [LoginInfoComponent, LogoutComponent],
  exports: [LoginInfoComponent, LogoutComponent]
})
export class UserModule{

  static forRoot():ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [ UserService]
    };
  }
}
