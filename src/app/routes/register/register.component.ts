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
    const that = this
    document.querySelector('#upload').addEventListener('change', function() {
      var file = this.files[0];
      let data = new FormData();

      data.append('file', file);
      console.log(file)
      that.api.upload(data).subscribe(res => {})          
      // 确认选择的文件是图片                
      if(file.type.indexOf("image") == 0) {
      
          // var reader = new FileReader();
          // reader.readAsDataURL(file);                    
          // reader.onload = function(e) {
          //     // 图片base64化
          //     var newUrl = this.result;
             
          // };
      }
  });
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
