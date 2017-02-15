import { NgModule, ModuleWithProviders  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SmartadminWidgetsModule } from '../widgets/smartadmin-widgets.module';
import { LoginInfoComponent } from "./login-info/login-info.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";
import { UserDetailComponent } from './userdetail/userdetail.component';
import { RoleDetailComponent } from './roledetail/roledetail.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [CommonModule, FormsModule, SmartadminWidgetsModule, UtilsModule ],
  declarations: [LoginInfoComponent, LogoutComponent, LoginComponent, UserDetailComponent, RoleDetailComponent ],
  exports: [LoginInfoComponent, LogoutComponent, LoginComponent, UserDetailComponent, RoleDetailComponent ],
  
})
export class UserModule{

  // static forRoot():ModuleWithProviders {
  //   return {
  //     ngModule: UserModule,
  //     providers: [ UserService]
  //   };
  // }
}
