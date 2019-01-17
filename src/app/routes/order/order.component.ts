import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  id = '';
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

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getInfo();
    });
  }

  getInfo() {
    this.api.orderInfo(this.id).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
    });
  }

  updata() {
    this.api.orderUpdate({
      id: this.id,
      status: 1
    }).subscribe(res => {
      this.getInfo();
    });
  }

}
