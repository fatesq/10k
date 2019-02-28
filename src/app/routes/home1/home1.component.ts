import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parse, stringify } from 'qs';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.less']
})
export class Home1Component implements OnInit {
  modal = sessionStorage['care'] == 0 ? true : false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
   
  }

  next() {
    if (sessionStorage['unlogin'] == 1) {
      const {path} = parse(window.location.href.split('?')[1]);
      this.router.navigateByUrl(`/login?path=${path}`);
    } else {
      this.router.navigateByUrl(`/home2`);
    }
  }

}
