import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
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
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    let { code, state } = parse(window.location.href.split('?')[1]);
    if (code) {
      console.log(code, state)
      this.httpClient.post(`${api}/login/auto`, {wxCode: code}).subscribe(res => {
        localStorage['token'] = res['data'].token
        localStorage['openId'] = res['data'].openId
        localStorage['uid'] = res['data'].uid
        if (res['code'] == 402) {
          window.location.hash = `/login?path=${state}`
          resolve();
        } else {
          window.location.hash = state ? `/${state}` : '/home'
          resolve();
        }
      });
    } else {
      // localStorage['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVpZCI6MTAsIm9wZW5JZCI6Im9wWWFZMDA1R1czaThMbllFc3J1RlMwVkh0TGMifSwiaWF0IjoxNTQ4MjE0ODQxLCJleHAiOjE1NDgzMDEyNDF9.pGPbCuinD67hy1TLfvH4incIDoksdkU_-7tGYdIk1-w'
      // localStorage['openId'] = 'opYaY005GW3i8LnYEsruFS0VHtLc'; // res['data'].openId
      // localStorage['uid'] = 10; // res['data'].uid
      // resolve();
      window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`)
    }
  });
}

}
