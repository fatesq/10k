import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parse, stringify } from 'qs';
const api = 'https://api.qinhemili.com';
@Injectable({
  providedIn: 'root'
})
export class StartService {

constructor(
  private httpClient: HttpClient,
  // private header: HttpHeaders,
  // private router: Router
) { }

load(): Promise<any> {
  return new Promise((resolve, reject) => {
    const { code, state } = parse(window.location.href.split('?')[1]);
    // const { wx } = Window;
    if (code || sessionStorage['reload'] == 1) {
      if (code) {
        this.httpClient.post(`${api}/login/auto`, {wxCode: code}).subscribe(res => {
          localStorage['token'] = res['data'].token;
          localStorage['openId'] = res['data'].openId;
          localStorage['uid'] = res['data'].uid;
          localStorage['userStatus'] = res['data'].userStatus;
          localStorage['eeStatus'] = res['data'].eeStatus;
          sessionStorage['reload'] = 1
          if (res['code'] == 302) {
            sessionStorage['care'] = 0;
          }
          if (res['code'] == 402) {
            window.location.hash = `/login?path=${state}`;
            resolve();
          } else if (state) {
            if (state == 'center' || state == 'home1') {
              window.location.replace(`https://mobile.qinhemili.com/#/${state}`);
            } else {
              window.location.hash = state != "undefined" ? `/${state}` : '/home1';
            }
            resolve();
          } else {
            resolve();
          }
        });
      } else if (sessionStorage['reload'] == 1) {
        if (state) {
          if (state == 'center' || state == 'home1') {
            window.location.replace(`https://mobile.qinhemili.com/#/${state}`);
          } else {
            window.location.hash = state != "undefined" ? `/${state}` : '/home1';
          }
          resolve();
        } else {
          resolve();
        }
      }
    } else if (sessionStorage['reload'] != 1) {
      // localStorage['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVlU3RhdHVzIjoxLCJ1c2VyU3RhdHVzIjoxLCJ1aWQiOjEwLCJvcGVuSWQiOiJvcFlhWTAwNUdXM2k4TG5ZRXNydUZTMFZIdExjIn0sImlhdCI6MTU1MDU2MzMyNSwiZXhwIjoxNTUwNjQ5NzI1fQ.zHsaFvrNFvaAoQRdZlS0xAiXpgQR78rimQ4Gxmse2Lo'
      // localStorage['openId'] = 'opYaY005GW3i8LnYEsruFS0VHtLc'; // res['data'].openId
      // localStorage['uid'] = 10; // res['data'].uid
      // localStorage['userStatus'] = 1;
      // localStorage['eeStatus'] = 1;
      // localStorage['care'] = 1;
      // sessionStorage['reload'] = 1
      // console.log(sessionStorage)
      // resolve();
      const url = state ? state : encodeURIComponent(window.location.hash.split('#/')[1]);
      window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=${url}#wechat_redirect`)
    }
  });
}

}
