import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Modal, Toast } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  list = [];
  totalRePrice = 0;
  modal = false;
  footer = [
    {
      text: '个人认证',
      onPress: () => {
        this.modal = false;
        this.router.navigate(['register'], {queryParams: {'type': 0 }});
      }
    },
    {
      text: '企业认证',
      onPress: () => {
        this.modal = false;
        this.router.navigate(['register'], {queryParams: {'type': 1 }});
      },
      style: {'color': '#000'}
    }
  ];
  constructor(
    private api: ApiService,
    private router: Router,
    // private _modal: Modal,
    // private _toast: Toast
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
    if (localStorage['userStatus'] == 1 || localStorage['eeStatus'] == 1) {
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
    } else {
      this.modal = true;
    }
  }

}
