

import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";

import {LoginInfoComponent} from "./login-info/login-info.component";
import {LogoutComponent} from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [CommonModule, FormsModule ],
  declarations: [LoginInfoComponent, LogoutComponent, LoginComponent ],
  exports: [LoginInfoComponent, LogoutComponent, LoginComponent ],
  
})
export class UserModule{

  // static forRoot():ModuleWithProviders {
  //   return {
  //     ngModule: UserModule,
  //     providers: [ UserService]
  //   };
  // }
}
