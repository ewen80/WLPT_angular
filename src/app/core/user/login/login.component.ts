/*
2016-9-29 created by wenliang
登录组件
*/

import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthenticationService }      from '../authentication/authentication.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loading = false;
  error = '';
  model: any = {};

  constructor(public authenticationService: AuthenticationService, public router: Router) {
    
  }

  login() {
    this.loading = true;
    //TODO:加上用户名和密码的参数
    this.authenticationService.login(this.model.username, this.model.password).subscribe(() => {
      if (this.authenticationService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default

        //TODO：修改登录后的默认跳转路径
        let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/home';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          // preserveQueryParams: true,
          // preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
      else{
        this.loading = false;
        this.error = '用户名或密码错误';
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}