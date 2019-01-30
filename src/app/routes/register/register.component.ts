import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  phone = '';
  idCard = '';
  idCardImg = '';
  enterpriseNo = '';
  enterpriseCity = '';
  enterpriseName = '';
  type = false;
  uploader: FileUploader;
  @ViewChild('fileUpload')
  fileUpload: ElementRef;
  constructor(
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.type = params['type'] == 1 ? true : false;
      this.getInfo();
    });
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

  getInfo() {
    this.api.customerInfo(localStorage['uid']).subscribe(res => {
        if (res['code'] == 200) {
          this.phone = res['data'].realName;
          this.idCard = res['data'].idCard;
          this.idCardImg = res['data'].idCardImg;
          this.enterpriseNo = res['data'].enterpriseNo;
          this.enterpriseCity = res['data'].enterpriseCity;
          this.enterpriseName = res['data'].enterpriseName;
          if (this.idCardImg != '' && this.idCardImg != null && this.idCardImg != undefined ) {
            document.getElementById('img').setAttribute('style', `background-image: url(${this.idCardImg});`);
          }
          
        }
    })
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
      this.idCardImg = JSON.parse(response).data.url;
      document.getElementById('img').setAttribute('style', `background-image: url(${this.idCardImg});`);
    } else {
      alert('上传失败');
    }
  }

  upStart() {
    this.fileUpload.nativeElement.click();
  }

  onOk(result) {
    this.enterpriseCity = this.getResult(result);
    console.log(this.enterpriseCity);
  }

  getResult(result) {
    const value = [];
    let temp = '';
    result.forEach(item => {
      value.push(item.label || item);
      temp += item.label || item;
    });
    return value.map(v => v).join(',');
  }

  login() {
    let info = {};
    if (this.idCard.length > 0 && this.idCard.length != 18) {
      alert('请输入18位身份证号');
      return false;
    }
    if (!this.type) {
      info = {
        id: localStorage['uid'],
        realName: this.phone,
        idCard: this.idCard,
        idCardImg: this.idCardImg,
      };
    } else {
      info = {
        id: localStorage['uid'],
        realName: this.phone,
        idCard: this.idCard,
        idCardImg: this.idCardImg,
        enterpriseNo: this.enterpriseNo,
        enterpriseCity: this.enterpriseCity,
        enterpriseName: this.enterpriseName,
      };
    }

    this.api.customerAdd(info).subscribe(res => {
      if (res['code'] == 200) {
        // localStorage['token'] = res['data'].token
        // localStorage['uid'] = res['data'].uid
        this.router.navigateByUrl('/result');

      } else {
        alert(res['description'] || res['msg']);
      }
    });
  }

}
