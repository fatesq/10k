import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import wx from 'weixin-js-sdk';
const api = 'https://api.qinhemili.com';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'mili';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.configWXShare();   //在根组件中配置分享
  }

  configWXShare() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(window);
        this.httpClient.get(`${api}/login/single?url=${window.location.href}`).subscribe(res => {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxc82408bb96b3aacf', // 必填，公众号的唯一标识
            timestamp: res['data'].timestamp, // 必填，生成签名的时间戳
            nonceStr: res['data'].nonceStr, // 必填，生成签名的随机串
            signature: res['data'].signature, // 必填，签名
            jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'], // 必填，需要使用的JS接口列表
          });
          wx.ready(function () {
            const ShareInfo = {
              title: '米粒车—人人皆可做车商', // 分享标题
              desc: '寻车,配资,代办手续一站全搞定', // 分享描述
              link: 'https://mobile.qinhemili.com',
              imgUrl: 'https://mobile.qinhemili.com/64.jpeg', // 分享图标
            };
            wx.onMenuShareTimeline(ShareInfo);
            wx.onMenuShareAppMessage(ShareInfo);
            // wx.updateTimelineShareData(ShareInfo);
            // wx.updateAppMessageShareData(ShareInfo);
          });
        });
      }
    })
  }
}
