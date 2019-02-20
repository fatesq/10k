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
  totalCutPrice =  0;
  modal = false;
  ratio: any = {value: 1, label: '80%'};
  fromType: any = {value: 0, label: '粒米帮选'};
  footer = [
    {
      text: '个人认证',
      onPress: () => {
        this.modal = false;
        this.router.navigate(['register'], {queryParams: {'type': 0, 'url': '/cart'}});
      }
    },
    {
      text: '企业认证',
      onPress: () => {
        this.modal = false;
        this.router.navigate(['register'], {queryParams: {'type': 1, 'url': '/cart'}});
      },
      style: {'color': '#000'}
    }
  ];
  select = [
    {value: 1, label: '80%'},
    {value: 2, label: '70%'},
    {value: 3, label: '60%'},
    {value: 4, label: '50%'},
    {value: 5, label: '40%'},
    {value: 6, label: '30%'},
    {value: 7, label: '20%'},
  ];
  select2 = [
    {value: 0, label: '米粒代寻'},
    {value: 1, label: '自有车源'}];
  constructor(
    private api: ApiService,
    private router: Router,
    // private _modal: Modal,
    // private _toast: Toast
  ) { }

  ngOnInit() {
    this.getList();
    this.getInfo();
  }

  getList() {
    this.api.carList(localStorage['uid']).subscribe(res => {
       this.list = res['data'];
       this.totalRePrice = res['totalRePrice'];
       this.totalCutPrice = res['totalCutPrice'];
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
          this.router.navigate(['order'], {queryParams: {'id': res['data'].code }});
        } else {
          alert(res['description'] || res['msg']);
        }
      });
    } else {
      this.modal = true;
    }
  }

  change() {
    this.api.userUp({
      id: localStorage['uid'],
      ratio: this.ratio.value,
      fromType: this.fromType.value,
    }).subscribe(res => {
      this.getList();
    });
  }
  getInfo() {
    this.api.customerInfo(localStorage['uid']).subscribe(res => {
      this.ratio = this.select.find(i => i.value === res['data'].ratio);
      this.fromType = this.select2.find(i => i.value === res['data'].fromType);
    });
  }

  onSelect(val) {
    this.ratio = val[0];
    this.change();
  }
  onSelect2(val2) {
    this.fromType = val2[0];
    this.change();
  }
}
