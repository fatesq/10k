import { Component, Inject, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  type1 = 0;
  type2 = 0;
  num = 1;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public info: any,
    private bottomSheetRef: MatBottomSheetRef<DetailComponent>,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  select(i) {
    this.type1 = i;
  }

  select2(i) {
    this.type2 = i;
  }
  del () {
    if (this.num > 1) {
      this.num --;
    }
  }
  add () {
    this.num++;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  submit() {
    this.api.carAdd({
      sku: this.info.sku[this.type1].item[this.type2].sku,
      uid: localStorage['uid'],
      amount: this.num,
      carId: this.info.id
    }).subscribe(res => {
      if (res['code'] == 200) {
        this.router.navigateByUrl('/cart');
        this.bottomSheetRef.dismiss();
      } else {
        alert(res['description'] || res['msg']);
      }
    });
  }

}
