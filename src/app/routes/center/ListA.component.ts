import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listA',
  templateUrl: './ListA.html',
  styleUrls: ['./center.component.less']
})
export class ListAComponent implements OnInit {
  data = [];
  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.api.listByUid({
      uid: localStorage['uid']
    }).subscribe(res => {
        if (res['code'] == 200) {
          this.data = res['data']
        }
    }) 
  }

  toOrder(code) {
    this.router.navigate(['order'], {queryParams: {'id': code }});
  }

  getType(key) {
    let info = ''
    switch (key) {
      case 0:
        info = '未付款'
        break;
      case 1:
        info = '买家已付款'
        break;
      case 2:
        info = '订单确认汇款'
        break;
      case 3:
        info = '预约验车中'
        break;
      case 4:
        info = '已预约验车'
        break;
      case 5:
        info = '车辆已入库'
        break;            
      default:
        break;
    }
    return info
  }

}