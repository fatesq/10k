import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { SearchService } from './search.service';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  value = '';
  num = 0;
  showBrand = false;
  subscriotion: any;
  constructor(
    public init: SearchService,
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet) {
    }

  ngOnInit() {
    this.getNum();
    this.subscriotion = this.init.getNum()
      .subscribe(i => this.num = i);
    const h = document.body.scrollHeight;  // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
    window.onresize = function () { // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
      if (document.body.scrollHeight < h) {
        document.body.style.height = `${h}px`;
      }
    };
  }

  blur(value) {
    // setTimeout(() => {
    //   localStorage['search'] = value;
    //   this.value = value;
    // }, 1000);
    document.getElementsByTagName('input')[0].blur();
    this.router.navigate(['/search/c'], {queryParams: {'query': this.value}});
  }

  over() {
    return false;
  }

  getNum() {
    this.api.cartNum(localStorage['uid']).subscribe(res => {
        // this.num = res['data'];
        this.init.emitNum(res['data']);
    });
  }

}
