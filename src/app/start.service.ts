import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse, stringify } from 'qs';
const api = 'https://api.qinhemili.com';
@Injectable({
  providedIn: 'root'
})
export class StartService {

constructor(
  private httpClient: HttpClient,
) { }

load(): Promise<any> {
  return new Promise((resolve, reject) => {
    let { code, state } = parse(window.location.href.split('?')[1]);
    code = '001w5vL31G9mrR1KeZI31a5wL31w5vLa';
    if (code) {
      this.httpClient.post(`${api}/login/auto`, {wxCode: code}).subscribe(res => {
        resolve();
      });
    } else {
      alert('请在手机微信中打开页面');
    }
  });
}

}
