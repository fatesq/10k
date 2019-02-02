import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import wx from 'weixin-js-sdk';
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
    console.log(window);
    this.httpClient.get(`${api}/login/single?url=${window.location.origin}`).subscribe(res => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxc82408bb96b3aacf', // 必填，公众号的唯一标识
        timestamp: res['data'].timestamp, // 必填，生成签名的时间戳
        nonceStr: res['data'].nonceStr, // 必填，生成签名的随机串
        signature: res['data'].signature, // 必填，签名
        jsApiList: [
          'updateTimelineShareData',
          'updateAppMessageShareData',
          'onMenuShareAppMessage',
          'onMenuShareTimeline'], // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {
        const ShareInfo = {
          title: '米粒车—人人皆可做车商', // 分享标题
          desc: '寻车,配资,代办手续一站全搞定', // 分享描述
          link: 'http://pms.chaimi.net/dist/public/auth.html',
          imgUrl: '../assets/db/64.jpg', // 分享图标
        };
        wx.onMenuShareTimeline(ShareInfo);
        wx.onMenuShareAppMessage(ShareInfo);
        wx.updateTimelineShareData(ShareInfo);
        wx.updateAppMessageShareData(ShareInfo);
      });
    });
    if (code) {
      this.httpClient.post(`${api}/login/auto`, {wxCode: code}).subscribe(res => {
        localStorage['token'] = res['data'].token;
        localStorage['openId'] = res['data'].openId;
        localStorage['uid'] = res['data'].uid;
        localStorage['userStatus'] = res['data'].userStatus;
        localStorage['eeStatus'] = res['data'].eeStatus;
        if (res['code'] == 302) {
          localStorage['care'] = 0;
        } else {
          localStorage['care'] = 1;
        }
        if (res['code'] == 402) {
          window.location.hash = `/login?path=${state}`;
          resolve();
        } else {
          window.location.hash = state != "undefined" ? `/${state}` : '/home1';
          resolve();
        }
      });
    } else {
      // localStorage['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVlU3RhdHVzIjoxLCJ1c2VyU3RhdHVzIjowLCJ1aWQiOjEwLCJvcGVuSWQiOiJvcFlhWTAwNUdXM2k4TG5ZRXNydUZTMFZIdExjIn0sImlhdCI6MTU0OTA4ODExMSwiZXhwIjoxNTQ5MTc0NTExfQ.sGonkJ8TLDeqO3X7qJZ8kw7zFDTPNx8tbJmyh1Ey_Yo'
      // localStorage['openId'] = 'opYaY005GW3i8LnYEsruFS0VHtLc'; // res['data'].openId
      // localStorage['uid'] = 10; // res['data'].uid
      // localStorage['userStatus'] = 1;
      //   localStorage['eeStatus'] = 1;
      // resolve();
     window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc82408bb96b3aacf&redirect_uri=https%3a%2f%2fmobile.qinhemili.com&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`)
    }
  });
}

}
