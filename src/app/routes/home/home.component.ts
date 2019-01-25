import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  data = [];
  carList = [];
  constructor(
    private api: ApiService,
    private bottomSheet: MatBottomSheet,
    private router: Router
    ) {}

  ngOnInit() {
    this.getBrand();
    this.getCar();
  }

  getCar() {
    this.api.hotCar().subscribe(res => {
        this.carList = res['data'];
    });
  }

  getBrand() {
    this.api.brandList().subscribe(res =>
      this.data = res['data'].filter((v, i ) => i < 5).map(i => ({
          icon: i.img,
          text: i.name,
          id: i.id,
      })
    ));
  }

  openBottomSheet(item): void {
    this.api.detail(item.id).subscribe(res => {
      this.bottomSheet.open(DetailComponent, {data: {data: res['data'], refesh: ''}});
    });
  }

  click(event) {
    this.router.navigate(['/search/b'], {queryParams: {'data': JSON.stringify(event.data) }});
  }

}
