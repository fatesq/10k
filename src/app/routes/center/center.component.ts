import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {
  data = [];
  user = {};
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.api.getOrder(localStorage['uid']).subscribe(res => {
        this.data = res['data'];
    });
    this.api.getUser(localStorage['uid']).subscribe(res => {
       this.user = res['data'];
    })
  }

  toOrder(code) {
    this.router.navigate(['over'], {queryParams: {'code': code }});
  }

  getType(key) {
    let info = '';
    switch (key) {
      case 0:
        info = '未付款';
        break;
      case 1:
        info = '已付款';
        break;
      case 2:
        info = '取车完成';
        break;
      case 3:
        info = '已取消';
        break;
      case 4:
        info = '退款中';
        break;
      case 5:
        info = '退款完成';
        break;
      default:
        break;
    }
    return info;
  }
}
