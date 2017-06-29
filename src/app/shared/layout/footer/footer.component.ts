import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public thisYear: string;

  constructor() {}

  ngOnInit() {
    this.thisYear = (new Date()).getFullYear().toString();
  }

}
