import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {
  data = [];
  user = {
    userName: '',
    phone: '',
    userStatus: '',
    eeStatus: '',
  };
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.api.getOrder(localStorage['uid']).subscribe(res => {
        this.data = res['data'];
    });
    this.api.getUser(localStorage['uid']).subscribe(res => {
       this.user = res['data'];
       document.getElementById('avatar').setAttribute("style", `background-image: url(${ this.user['avatar'] ?  this.user['avatar'] :'https://ricecar.oss-cn-hangzhou.aliyuncs.com/21281548063891_.pic.jpg'});background-repeat:no-repeat; background-size:100% 100%;`)
    })
  }

  toOrder(code) {
    this.router.navigate(['over'], {queryParams: {'code': code }});
  }
  
  getSelf(key) {
    let info = '';
    switch (key) {
      case 0:
        info = '未审核';
        break;
      case 1:
        info = '审核通过';
        break;
      case 2:
        info = '审核未通过';
        break;
      default:
        break;
    }
    return info;
  }

  getCompany(key) {
    let info = '';
    switch (key) {
      case 0:
        info = '未审核';
        break;
      case 1:
        info = '审核通过';
        break;
      case 2:
        info = '审核未通过';
        break;
      default:
        break;
    }
    return info;
  }


  getType(key) {
    let info = '';
    switch (key) {
      case 0:
        info = '未付款';
        break;
      case 1:
        info = '已付款';
        break;
      case 2:
        info = '取车完成';
        break;
      case 3:
        info = '已取消';
        break;
      case 4:
        info = '退款中';
        break;
      case 5:
        info = '退款完成';
        break;
      default:
        break;
    }
    return info;
  }
}
