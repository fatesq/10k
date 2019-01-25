import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { parse, stringify } from 'qs';
let t
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  phone = '';
  validCode = '';
  time = 60;
  constructor(
    private api: ApiService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    clearTimeout(t)
  }

  getCode() {
    if (!this.phone || this.phone.length != 11) {
        alert('请输入手机号')
       return false
    }
    
    if (this.time == 60) {
      this.api.sms({
        phone: this.phone
      }).subscribe(res => {
  
      })
      this.reload();
    }
  }

  reload() {
    if (this.time > 0) {
      this.time --
      t = setTimeout(()=> this.reload(), 1000)
    } else {
      this.time = 60
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
        const {path} = parse(window.location.href.split('?')[1])
        this.router.navigateByUrl(`/${path}`)

      } else {
        alert(res['description'] || res['msg'])
      }
    })
  }

}
