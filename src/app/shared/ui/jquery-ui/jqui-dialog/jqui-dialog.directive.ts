import {Directive, ElementRef, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

declare var $: any;



@Directive({
  selector: '[saJquiDialog]'
})
export class JquiDialog implements OnInit {


  @Input() saJquiDialog: any;

  constructor(private el: ElementRef) {
  }


  ngOnInit(){

    $(this.el.nativeElement).dialog(this.saJquiDialog)
  }
}
