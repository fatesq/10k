import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { parse, stringify } from 'qs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  phone = '';
  validCode = '';
  constructor(
    private api: ApiService,
    private router: Router,
    
  ) {}

  ngOnInit() {
  }

  getCode() {
    this.api.sms({
      phone: this.phone
    }).subscribe(res => {

    })
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
