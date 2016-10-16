

import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";

import {LoginInfoComponent} from "./login-info/login-info.component";
import {LogoutComponent} from "./logout/logout.component";
import {UserService} from "./user.service";
import { LoginComponent } from "./login/login.component";
import { AuthenticationGuard, AuthenticationService } from "./authentication/index";

@NgModule({
  imports: [CommonModule, FormsModule ],
  declarations: [LoginInfoComponent, LogoutComponent, LoginComponent ],
  exports: [LoginInfoComponent, LogoutComponent, LoginComponent ],
  providers:[
    AuthenticationGuard,  //用户登录guard
    AuthenticationService //用户登录服务
  ]
})
export class UserModule{

  static forRoot():ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [ UserService]
    };
  }
}
