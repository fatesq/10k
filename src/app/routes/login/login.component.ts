import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { parse, stringify } from 'qs';
import { Modal, Toast } from 'ng-zorro-antd-mobile';
let t;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [Modal, Toast]
})
export class LoginComponent implements OnInit, OnDestroy {
  phone = '';
  validCode = '';
  time = 60;
  modal = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private _modal: Modal,
    private _toast: Toast
  ) {}

  ngOnInit() {
    clearTimeout(t);
      // 关键代码
    window.addEventListener('resize', this.scrollChange);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.scrollChange);
  }

  scrollChange () {
    const win_h = document.body.scrollHeight;
    if (document.body.scrollHeight < win_h) {
      document.getElementsByClassName('agree')[0]['style'].display = 'none';
    } else {
      document.getElementsByClassName('agree')[0]['style'].display = 'block';
    }
  }

  getCode() {
    if (!this.phone || this.phone.length != 11) {
        alert('请输入手机号');
       return false
    }
    if (this.time == 60) {
      this.api.sms({
        phone: this.phone
      }).subscribe(res => {});
      this.reload();
    }
  }

  reload() {
    if (this.time > 0) {
      this.time --;
      t = setTimeout(() => this.reload(), 1000);
    } else {
      this.time = 60;
    }
  }

  login() {
    this.api.dologin({
      phone: this.phone,
      validCode: this.validCode,
      wxCode: '',
      openId: localStorage['openId']
    }).subscribe(res => {
      if (res['code'] == 200) {
        localStorage['token'] = res['data'].token;
        localStorage['openId'] = res['data'].openId;
        localStorage['uid'] = res['data'].uid;
        localStorage['userStatus'] = res['data'].userStatus;
        localStorage['eeStatus'] = res['data'].eeStatus;
        const {path} = parse(window.location.href.split('?')[1]);
        this.router.navigateByUrl(`/${path ? path : 'home1'}`);
      } else {
        alert(res['description'] || res['msg']);
      }
    })
  }

  open(e) {
    e.stopPropagation();
    e.preventDefault();
    this.modal = true;
  }

  onChange = e => {
    // this.disabledStatus = !this.disabledStatus;
    console.log('onChange2 Event: ', e);
   //  console.log('agreeItemData: ', this.agreeItemData);
  }
}
