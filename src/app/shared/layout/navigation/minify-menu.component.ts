import {Component} from '@angular/core';

declare var $:any;

@Component({
  selector: 'sa-minify-menu',
  template: `<span class="minifyme" data-action="minifyMenu" (click)="toggle()">
    <i class="fa fa-arrow-circle-left hit"></i>
</span>`,
})
export class MinifyMenuComponent {

  constructor() {
  }

  toggle() {
    var $body = $('body');

    if (!$body.hasClass("menu-on-top")) {
      $body.toggleClass("minified");
      $body.removeClass("hidden-menu");
      $('html').removeClass("hidden-menu-mobile-lock");
    }

  }
}
