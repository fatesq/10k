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
    this.getBrand()
  }

  getBrand() {
    this.api.brandList().subscribe(res =>
      this.brand = res['data'].map(i => ({
          icon: i.img,
          text: i.name,
      })
    ));
  }

  blur(value) {
    this.api.search({query: value}).subscribe(res => {
      this.data = res['data'];
    });
  }

  click(event) {
    this.api.search({query: event.data.text}).subscribe(res => {
      this.data = res['data'];
    });
  }

}
