import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  phone = '';
  idCard = '';
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  
  login() {
    this.api.customerAdd({
      phone: this.phone,
      idCard: this.idCard,
      idCardImg: '',
      openId: localStorage['openId']
    }).subscribe(res => {
      if (res['code'] == 200) {
        // localStorage['token'] = res['data'].token
        // localStorage['uid'] = res['data'].uid
        // this.router.navigateByUrl('/home')

      } else {
        alert(res['description'] || res['msg'])
      }
    })
  }

}
