import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

const now = new Date();
@Component({
  selector: 'app-sub-car',
  templateUrl: './subCar.component.html',
  styleUrls: ['./subCar.component.less']
})
export class SubCarComponent implements OnInit {
  cars = [];
  totalAmount = 0;
  totalCutPrice = 0;
  time = new Date();
  timeText = '';
  minDate = new Date();
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.api.goGetOrder({
        uid: localStorage['uid'],
        cars: JSON.parse(params['cars'])
      }).subscribe(res => {
        this.cars = res['data'].cars;
        this.totalAmount = res['data'].totalAmount;
        this.totalCutPrice = res['data'].totalCutPrice;
      });
    });
  }


  onOk1(result: Date) {
    console.log(result)
    console.log( moment(result).format('YYYY-MM-DD'))
    this.time = result;
    this.timeText = moment(result).format('YYYY-MM-DD HH:mm');
  }


  submit() {
    if (!this.timeText) {
      alert('请选择时间')
      return false;
    }
    console.log(moment(this.time).valueOf())
    this.api.addOrder({
      uid: localStorage['uid'],
      verifySite: '米粒好车有限公司',
      verifyTime: moment(this.time).valueOf(),
      cars: this.cars.map(i => {
        return {
          storeId: i.id,
          amount: i.amount
        };
      })
    }).subscribe(res => {
        if (res['code'] == 200) {
          this.router.navigate(['over'], {queryParams: {'id': res['data'].code }});
        } else {
          alert(res['msg'])
        }
    })
  }

}
