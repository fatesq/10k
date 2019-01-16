import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  data = [];
  value = '';
  constructor(
    private api: ApiService,
    private bottomSheet: MatBottomSheet) {}

  openBottomSheet(item): void {
    this.api.detail(item.id).subscribe(res => {
      this.bottomSheet.open(DetailComponent, {data: res['data']});
    });
  }

  ngOnInit() {
  }

  blur(value) {
    this.api.search({query: value}).subscribe(res => {
      this.data = res['data'];
    });
  }

}
