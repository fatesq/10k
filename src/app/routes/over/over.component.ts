import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.less']
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
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.getInfo();
    });
  }

  getInfo() {
    this.api.carDetail(this.code).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
    });
  }

}
