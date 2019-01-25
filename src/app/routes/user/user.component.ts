import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  info = {
    userStatus: 0,
    eeStatus: 0,
  };
  name = '';
  avatar = '../../../assets/db/icon_warehouse_nor.png';
  uploader: FileUploader;
  @ViewChild('fileUpload')
  fileUpload: ElementRef;
  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    this.uploader = new FileUploader({
      url: 'https://api.qinhemili.com/file/upload',
      method: 'POST',
      itemAlias: 'file',
      autoUpload: true,
      headers: [{name: 'Access-Control-Allow-Credentials', value: 'true'}],
    });
    console.log(this.uploader);
    this.uploader.onSuccessItem = this.successItem.bind(this);
    this.uploader.onAfterAddingFile = this.afterAddFile;
    this.uploader.onBuildItemForm = this.buildItemForm;
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.api.getUser(localStorage['uid']).subscribe(res => {
      this.info = res['data'];
      this.avatar = this.info['avatar'];
      this.name = this.info['realName'] ? this.info['realName'] : '填写真实姓名';
    });
  }

  statusType(key) {
    let type = '去认证';
    switch (key) {
      case 0:
        type = '去认证';
        break;
      case 1:
        type = '认证通过';
        break;
      case 2:
        type = '验证未通过';
        break;
      default:
        break;
    }
    return type;
  }

  buildItemForm(fileItem, form: any): any {
    if (!!fileItem['realFileName']) {
      form.append('fileName', fileItem['realFileName']);
    }
  }
  selectedFileOnChanged(event) {}
  afterAddFile(fileItem): any {
    fileItem.withCredentials = false;
  }
  successItem(item, response: string, status: number, headers): any {
    if (status == 200) {
      this.avatar = JSON.parse(response).data.url;
      console.log(this.avatar)
    } else {
      alert('上传失败');
    }
  }

  upStart() {
    this.fileUpload.nativeElement.click();
  }

  login() {
    this.api.userUp({
      id: localStorage['uid'],
      avatar: this.avatar,
      realName: this.name,
    }).subscribe(res => {
      if (res['code'] == 200) {
        // localStorage['token'] = res['data'].token
        // localStorage['uid'] = res['data'].uid
        this.router.navigateByUrl('/center');
      } else {
        alert(res['description'] || res['msg']);
      }
    });
  }
}
