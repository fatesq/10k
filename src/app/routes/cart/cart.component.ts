import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  list = [];
  totalRePrice = 0;
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.api.carList(localStorage['uid']).subscribe(res => {
       this.list = res['data'];
       this.totalRePrice = res['totalRePrice'];
    });
  }

  del (i) {
    if (this.list[i].amount > 1) {
      this.list[i].amount --;
      this.changeCar(this.list[i].id, this.list[i].amount);
    } else {
      this.api.carDel(this.list[i].id).subscribe(res => {
          this.getList();
      });
    }
  }
  add (i) {
    this.list[i].amount ++;
    this.changeCar( this.list[i].id, this.list[i].amount);
  }

  changeCar(id, count) {
    this.api.carUp({
      amount: count,
      id: id
    }).subscribe(res => {
      this.getList();
    });
  }

  submit() {
    this.api.orderAdd({
      uid: localStorage['uid'],
      cartId: this.list.map(i => i.id)
    }).subscribe(res => {
      if (res['code'] === 200) {
        this.router.navigate(['order'], {queryParams: {'code': res['data'].code }});
      } else {
        alert(res['description'] || res['msg']);
      }
    });
  }

}
