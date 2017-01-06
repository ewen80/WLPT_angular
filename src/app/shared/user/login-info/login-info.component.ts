import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../core/user/user.service";
import {LayoutService} from "../../../shared/layout/layout.service";
import { User } from "../../../core/user/user";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:User;

  constructor(
    private userService: UserService,
              private layoutService: LayoutService) {
                
  }

  ngOnInit() {
    // this.userService.getLoginInfo().subscribe(user => {
    //   this.user = user
    // })
    this.userService.getLoginInfo().then( user => this.user = user);
  }



  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
