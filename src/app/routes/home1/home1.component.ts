import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.less']
})
export class Home1Component implements OnInit {
  modal = localStorage['care'] == 0 ? true : false;
  constructor() { }

  ngOnInit() {
  }

}
