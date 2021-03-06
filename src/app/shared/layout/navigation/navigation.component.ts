import {Component, OnInit} from '@angular/core';
import { LoginInfoComponent } from "../../user/login-info/login-info.component";
import { Menu } from "app/shared/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";
import { MenuRenderService } from "app/shared/layout/navigation/menu/menu-render.service";


@Component({
  selector: 'sa-navigation',
  templateUrl: './navigation.component.html',
  providers: [
    MenuRenderService
  ]
})
export class NavigationComponent implements OnInit {

  public menuNodes: Menu[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.loadMenus();
  }

  private loadMenus(){
      this.menuService.getAuthorizedMenuTree('admin')
          .then( response => {
            this.menuNodes = response;
          });
  }

}
