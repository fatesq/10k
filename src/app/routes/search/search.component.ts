import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  data = [];
  value = '';
  brand = [];
  title = '';
  series = [];
  num = 0;
  showBrand = false;
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate',  () => {
        console.log(this.data, this.series)
        console.log(this.showBrand, this.data.length, this.series.length)
        if (this.showBrand && this.data.length > 0) {
          this.data = [];
          history.pushState(null, null, document.URL);
        } else if (this.data.length < 1 && this.series.length > 0) {
          this.series = [];
          history.pushState(null, null, document.URL);
        } else if (this.data.length < 1 && this.series.length < 1) {
          window.location.hash = 'home';
        }
      });
    }

  openBottomSheet(item): void {
    this.api.detail(item.id).subscribe(res => {
      this.bottomSheet.open(DetailComponent, {data: {data: res['data'], refesh: this.getNum } });
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['data']) {
        const data = JSON.parse(params['data']);
        // this.api.search({query: params['text']}).subscribe(res => {
        //   this.data = res['data'];
        // });
        this.api.byBrand({brandId: data.id, page: 1, size: 99}).subscribe(res => {
          this.title = data;
          this.series = res['data'];
          this.showBrand =  true;
        });
      }
    });
    this.getBrand();
    this.getNum();
  }

  getBrand() {
    this.api.brandList().subscribe(res =>
      this.brand = res['data'].map(i => ({
          icon: i.img,
          text: i.name,
          id: i.id,
      })
    ));
  }

  blur(value) {
    this.api.search({query: value}).subscribe(res => {
      this.data = res['data'];
      this.showBrand = false;
      this.series = [];
    });
  }

  click(event) {
    this.api.byBrand({brandId: event.data.id, page: 1, size: 99}).subscribe(res => {
      this.title = event.data;
      this.series = res['data'];
      this.showBrand =  true;
    });
  }

  seriesClick(name) {
    this.api.bySeries({seriesName: name, page: 1, size: 99}).subscribe(res => {
      this.title['seriesName'] = name;
      this.data = res['data'];
    });
  }

  getNum() {
    this.api.cartNum(localStorage['uid']).subscribe(res => {
        this.num = res['data'];
    });
  }

}
