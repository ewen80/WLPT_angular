import {Component, OnInit} from '@angular/core';

import {UserService} from "../../../core/services/user.service";
import {LayoutService} from "../../../shared/layout/layout.service";
import { User } from "app/shared/entity/user";


@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:User;

  constructor(private userService: UserService, private layoutService: LayoutService) {
                
  }

  ngOnInit() {
    // this.userService.getLoginInfo().subscribe(user => {
    //   this.user = user
    // })

    this.userService.getLoginUser().then( user => this.user = user);
  }



  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
