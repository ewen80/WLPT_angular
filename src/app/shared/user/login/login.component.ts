/*
2016-9-29 created by wenliang
登录组件
*/

import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthenticationService }      from '../../../core/user/authentication/authentication.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading = false;
  error = '';
  model: any = {};

  constructor(public authenticationService: AuthenticationService, public router: Router) {
      
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.userid, this.model.password).subscribe((authResult) => {
      if (authResult) {
        let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/home';
        // Redirect the user
        this.router.navigate([redirect]);
      }
      else{
        this.loading = false;
        this.error = '用户名或密码错误';
      }
    });
  }

  
}