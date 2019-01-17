import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartService {

constructor() { }

load(): Promise<any> {
  return new Promise((resolve, reject) => {
    let href = window.location.href;
    console.log(href);
  });
}

}
