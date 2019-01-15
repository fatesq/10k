import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  phone = ''
  validCode = ''
  constructor(
    private api: ApiService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
  }

  getCode() {
    this.api.sms({
      phone:this.phone
    }).subscribe(res => {

    })
  }

  login() {
    this.api.dologin({
      phone: this.phone,
      validCode: this.validCode,
    }).subscribe(res => {
      if (res['code'] == 200) {
        this.router.navigateByUrl('/home')
      } else {
        alert(res['description'] || res['msg'])
      }
    })
  }

}
