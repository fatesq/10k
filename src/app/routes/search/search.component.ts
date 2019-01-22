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
  showBrand = false;
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet) {}

  openBottomSheet(item): void {
    this.api.detail(item.id).subscribe(res => {
      this.bottomSheet.open(DetailComponent, {data: res['data']});
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['text']) {
        this.api.search({query: params['text']}).subscribe(res => {
          this.data = res['data'];
        });
      }
    });
    this.getBrand();
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
      this.data = res['data'];
    });
  }

}
