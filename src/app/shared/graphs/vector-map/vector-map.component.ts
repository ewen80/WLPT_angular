import {Component, OnInit, Input, ElementRef, AfterContentInit, OnDestroy} from '@angular/core';
import {WORLD_MILL} from "./world-mill";

declare var $: any;

@Component({
  selector: 'vector-map',
  template: '<div class="vector-map vector-map-pane" style="height: 300px;"></div>',
})
export class VectorMapComponent implements AfterContentInit, OnDestroy {

  @Input() data: any;
  constructor(private el: ElementRef) { }

  ngAfterContentInit() {

    System.import('jvectormap/jquery-jvectormap.min.js').then(()=>{
      $.fn.vectorMap('addMap', 'world_mill', WORLD_MILL);
     this.render()
    })

  }


  private mapObject: any;

  render(){
    const $vectorMap = $('.vector-map-pane', this.el.nativeElement).vectorMap({
      map: 'world_mill',
      backgroundColor: 'white',
      series: {
        regions: [{
          values: this.data,
          scale: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial'
        }]
      },
      onRegionTipShow: (e, el, code)=>{
        el.html(el.html()+' (GDP - '+this.data[code]+')');
      }
    });

    this.mapObject = $vectorMap.vectorMap('get', 'mapObject');
    $('.jvectormap-zoomin', this.el.nativeElement).html('<i class="fa fa-plus"></i>')
    $('.jvectormap-zoomout', this.el.nativeElement).html('<i class="fa fa-minus"></i>')

  }


  ngOnDestroy(){
    this.mapObject && this.mapObject.remove()
  }
}
