import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { SearchService } from './search.service';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  value = '';
  num = 0;
  showBrand = false;
  subscriotion: any;
  constructor(
    public init: SearchService,
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet) {
    }

  ngOnInit() {
    this.getNum();
    this.subscriotion = this.init.getNum()
      .subscribe(i => this.num = i);
  }

  blur(value) {
    // setTimeout(() => {
    //   localStorage['search'] = value;
    //   this.value = value;
    // }, 1000);
    document.getElementsByTagName('input')[0].blur();
    this.router.navigate(['/search/c'], {queryParams: {'query': this.value}});
  }

  over() {
    return false;
  }

  getNum() {
    this.api.cartNum(localStorage['uid']).subscribe(res => {
        // this.num = res['data'];
        this.init.emitNum(res['data']);
    });
  }

}
