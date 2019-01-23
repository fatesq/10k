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
  tiemText: any;
  state: any = {
    en: false,
    date: null,
    show: false,
    pickTime: false,
    now: new Date(),
    type: 'range',
    enterDirection: '',
    rowSize: 'normal',
    showShortcut: false,
    infinite: true,
    defaultValue: undefined,
    minDate: new Date(+now - 5184000000),
    maxDate: new Date(+now + 31536000000),
    onSelect: undefined,
    // getDateExtra: date => {
    //   return extra[+date];
    // }
  };
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

  initPara() {
    this.state = {
      ...this.state,
      ...{
        show: false,
        date: null,
        pickTime: false,
        now: new Date(),
        type: 'range',
        rowSize: 'normal',
        infinite: true,
        enterDirection: '',
        onSelect: undefined,
        showShortcut: false,
        defaultValue: undefined,
        minDate: new Date(+now - 5184000000),
        maxDate: new Date(+now + 31536000000),
        // getDateExtra: date => {
        //   return extra[+date];
        // }
      }
    };
  }

  onClick_4() {
    this.initPara();
    this.state.show = true;
    this.state.pickTime = true;
    this.state.type = 'one';
  }

  triggerCancel() {
    this.state.show = false;
  }

  triggerConfirm(value) {
    const { startDate, endDate } = value;
    this.state = {
      ...this.state,
      ...{ show: false, startDate, endDate }
    };
    this.triggerCancel();
    console.log(startDate);
    this.tiemText = startDate.date;
    console.log('onConfirm', moment(startDate.date).unix(), endDate);
  }

  submit() {
    if (!this.tiemText) {
      alert('请选择时间')
      return false;
    }
    this.api.addOrder({
      uid: localStorage['uid'],
      verifySite: '米粒好车有限公司',
      verifyTime: moment(this.tiemText).unix(),
      cars: this.cars.map(i => {
        return {
          storeId: i.id,
          amount: i.amount
        };
      })
    }).subscribe(res => {
        if (res['code'] == 200) {
          this.router.navigate(['over'], {queryParams: {'code': res['data'].code }});
        } else {
          alert(res['msg'])
        }
    })
  }

}
