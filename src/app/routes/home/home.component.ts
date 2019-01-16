import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  data = [];
  carList = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getBrand();
    this.getCar();
  }

  getCar() {
    this.api.hotCar().subscribe(res => {
        this.carList = res['data'];
        console.log(this.carList);
    });
  }

  getBrand() {
    this.api.brandList().subscribe(res =>
      this.data = res['data'].map(i => ({
          icon: i.img,
          text: i.name,
      })
    ));
  }
}
