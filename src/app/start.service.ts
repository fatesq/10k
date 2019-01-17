import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { parse, stringify } from 'qs';
const api = 'https://api.qinhemili.com';
@Injectable({
  providedIn: 'root'
})
export class StartService {

constructor(
  private httpClient: HttpClient,
  // private router: Router
) { }

load(): Promise<any> {
  return new Promise((resolve, reject) => {
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    let { code, state } = parse(window.location.href.split('?')[1]);
    code = '07101GPi2WFz5C0ydpOi2sUzPi201GPF';
    if (code) {
      console.log(code)
      this.httpClient.post(`${api}/login/auto`, {wxCode: code}).subscribe(res => {
        localStorage['openId'] = res['data'].openId
        if (res['code'] == 402) {
          window.location.hash = '/login'
          resolve();
        } else {
          resolve();
        }
        
      });
    } else {
      window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect")
    }
  });
}

}
