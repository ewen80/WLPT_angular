import {
  Directive, ElementRef, OnInit,
  AfterViewInit,
  HostListener
} from '@angular/core';
import {Subscription} from "rxjs/Rx";

import {LayoutService} from "../../layout/layout.service";
import { Router, NavigationEnd } from "@angular/router";
import { MenuRenderService } from "app/shared/layout/navigation/menu/menu-render.service";

declare var $:any;

@Directive({
  selector: '[saSmartMenu]'
})
export class SmartMenuDirective implements OnInit, AfterViewInit {

  private $menu:any;
  private layoutSub:Subscription;
  private routerSub:Subscription;

  constructor(
    private menu:ElementRef,
    private router: Router,
    public layoutService:LayoutService,
    private menuRenderService: MenuRenderService
  ) {
    this.$menu = $(this.menu.nativeElement);

    //至少等待10ms，没有新的数据流发送过来才执行（防止多个叶子节点事件发送过来导致执行多次ngAfterViewInit事件）
    this.menuRenderService.foundLeaf$.debounceTime(10).subscribe(
      ()=>{
        var d = new Date();
        this.ngAfterViewInit();
      }
    );
  }

    ngOnInit() {
      this.layoutSub = this.layoutService.subscribe((store)=> {
        this.processLayout(store)

    });

    this.routerSub = this.router.events.subscribe((event: any)=>{

      setTimeout(()=>{
        this.processLayout(this.layoutService.store)
      }, 1);
      this.routerSub.unsubscribe()
    });

    $('[routerLink]', this.$menu).on('click',()=>{
      if(this.layoutService.store.mobileViewActivated){
        this.layoutService.onCollapseMenu()
      }
    })

  }


  ngAfterViewInit() {
    this.$menu.find('li:has(> ul)').each((i, li)=> {
      let $menuItem = $(li);
      let $a = $menuItem.find('>a');
      //如果a后面已经有<b>则不再添加
      if($a.find('>b').length == 0){
        let sign = $('<b class="collapse-sign"><em class="fa fa-plus-square-o"/></b>');
        $a.on('click', (e)=> {
          this.toggle($menuItem);
          e.stopPropagation();
          return false;
        }).append(sign);
      } 
    });
  }

  ngOnDestroy() {
    this.layoutSub.unsubscribe();
  }

  private processLayout = (store)=>{
    if (store.menuOnTop) {
      this.$menu.find('li.open').each((i, li)=> {
        this.toggle($(li), false)
      })
    } else {
      this.$menu.find('li.active').each((i, li)=> {
        $(li).parents('li').each((j, parentLi)=>{
          this.toggle($(parentLi), true)
        })
      })
    }

    if(store.mobileViewActivated){
      $('body').removeClass("minified");
    }
  };

  private toggle($el, condition = !$el.data('open')) {
    $el.toggleClass('open', condition);

    if(condition){
      $el.find('>ul').slideDown();
    } else {
      $el.find('>ul').slideUp();
    }

    $el.find('>a>.collapse-sign>em')
      .toggleClass('fa-plus-square-o', !condition)
      .toggleClass('fa-minus-square-o', condition);

    $el.data('open', condition);

    if (condition) {
      $el.siblings('.open').each((i, it)=> {
        let sib = $(it);
        this.toggle(sib, false)
      })
    }
  }

}
