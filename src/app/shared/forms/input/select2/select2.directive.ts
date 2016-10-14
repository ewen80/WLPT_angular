import {Directive, ElementRef, OnInit} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[select2]'
})
export class Select2Directive implements OnInit{

  constructor(private el: ElementRef) {

  }

  ngOnInit(){
    System.import('script!select2/dist/js/select2.min.js').then(()=>{
      $(this.el.nativeElement).select2()
    })
  }

}
