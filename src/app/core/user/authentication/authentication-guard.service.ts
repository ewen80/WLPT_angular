/*
2016/9/29 created by wenliang

登录认证guard服务(判断是否已经登录)
*/


import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { AuthenticationService }      from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    //注入登录验证服务 authenticationService
    //注入Router
    
  }

  //TODO:修改 ActivatedRouteSnapshot，RouterStateSnapshot 为可observable参数
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  //用于动态模块加载
  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  //检查登录状态，如果已登录返回true，未登录跳转到登录页面
  checkLogin(url: string): boolean {
    //如果已经登录则直接返回
    if (this.authenticationService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authenticationService.redirectUrl = url;

    // let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': sessionId },
    //   fragment: 'anchor' //可以跳转到页面指定位置
    // };

    // Navigate to the login page with extras
    // this.router.navigate(['/login'], navigationExtras);
    this.router.navigate(['/login']);
    return false;
  }
}