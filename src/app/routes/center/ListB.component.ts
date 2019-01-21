import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-b',
  templateUrl: './ListB.html',
  styleUrls: ['./center.component.less']
})
export class ListBComponent implements OnInit {
  data = [];
  totalAmount = 0;
  totalCutPrice = 0;
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  del (i) {
    if (this.data[i].count > 1) {
      this.data[i].count --;
      this.changeCar(this.data[i].id, this.data[i].count, i);
    } else {
      this.data[i].check = false;
      this.data[i].count = 1;
      // this.api.carDel(this.data[i].id).subscribe(res => {
      //     this.getList();
      // });
    }
  }
  add (i) {
    if (this.data[i].count < this.data[i].amount) {
      this.data[i].count ++;
      this.changeCar(this.data[i].id, this.data[i].count, i);
    } else {
      alert('库存不足')
    }
  }

  changeCar(id, count, i) {
    this.api.change({
      uid: localStorage['uid'],
      cars: [{
        count: count,
        storeId: id
      }]
    }).subscribe(res => {
      // this.getList();
      if (res['code'] == 200) {
        res['data'].cars[0].check = true;
        this.totalAmount = res['data'].totalAmount;
        this.totalCutPrice = res['data'].totalCutPrice;
        this.data[i] = res['data'].cars[0];
      }
    });
  }

  getList() {
    this.api.myStore({
      uid: localStorage['uid']
    }).subscribe(res => {
        if (res['code'] == 200) {
          this.data = res['data'].map(i => {
            i['check'] = false;
            i['count'] = 1;
            return i;
          });
        }
    });
  }

  updata(i) {
    this.data[i].check = true;
    this.changeCar(this.data[i].id, this.data[i].count, i)
  }

  submit() {
    const cars = this.data.filter(i => i.check).map(i => {
      return {
        storeId: i.id,
        amount: i.count
      };
    });
    if (cars.length < 1) {
      alert('请设置取车数量');
    } else {
      this.router.navigate(['subCar'], {queryParams: {'cars': JSON.stringify(cars) }});
    }
  }
}
