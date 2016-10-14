import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Resolve
}                           from '@angular/router';

@Injectable()
export class LayoutGuard implements Resolve {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    // return this.checkLogin(url);

    return true
  }


}
