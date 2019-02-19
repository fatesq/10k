import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Toast } from 'ng-zorro-antd-mobile';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [Toast]
})
export class OrderComponent implements OnInit {
  code = '';
  info = {
    code: '',
    totalRePrice: '',
    createTime: '',
    status: '',
  };
  cars = [];
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute
  ) { }

  // ngAfterViewInit() {
  //   var docEl = document.documentElement,
  //   resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  //   recalc = function () {
  //       var clientWidth = docEl.clientWidth;
  //       if (!clientWidth) return;
  //       docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
  //   };
  //   if (!document.addEventListener) return;
  //   window.addEventListener(resizeEvt, recalc, false);
  //   document.addEventListener('DOMContentLoaded', recalc, false);
  // }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.getInfo();
    });
    const clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
      const toast = Toast.show('复制成功', 0);
      setTimeout(() => {
        Toast.hide();
      }, 1500);
    });
  }

  getInfo() {
    this.api.orderInfo(this.code).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
    });
  }

  updata(type=1) {
    this.api.orderUpdate({
      code: this.code,
      status: type
    }).subscribe(res => {
      this.getInfo();
    });
  }

}
