import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  data = [];
  carList = <any>[];
  constructor(private api: ApiService) {
    console.log(123214)
  }

  ngOnInit() {
    this.getBrand();
    this.getCar();
    // this.data = Array.from(new Array(5)).map((_val, i) => ({
    //   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    //   text: `name${i}`
    // }));
  }

  getCar() {
    this.api.hotCar().subscribe(res => {
        this.carList = res['data']
        console.log(this.carList)
    })
  }

  getBrand() {
    this.api.brandList().subscribe(res =>
      this.data = res['data'].map(i => ({
          icon: i.img,
          text: i.name,
      })
    ))
  }
}
