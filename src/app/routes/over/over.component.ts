import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Toast } from 'ng-zorro-antd-mobile';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.less'],
  providers: [Toast]
})
export class OverComponent implements OnInit {
  code = '';
  info = {
    code: '',
    totalCutPrice: '',
    createTime: '',
    status: '',
    saleName: '',
    salePhone: '',
    verifyTime: '',
    verifySite: ''
  };
  cars = [];
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute
  ) {
    history.pushState(null, null, document.URL);
      window.addEventListener('popstate',  () => {
          window.location.hash = 'center';
      }, false);
  }

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
    this.api.carDetail(this.code).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
    });
  }

}
