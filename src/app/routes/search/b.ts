import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
selector: 'app-search-b',
templateUrl: './B.html',
styleUrls: ['./search.component.less']
})
export class SearchBComponent implements OnInit {
    title = {
        seriesName: '',
        icon: '',
        text: '',
        id: '',
    };
    series = [];
    constructor(
        private api: ApiService,
        private router: Router,
        public activeRoute: ActivatedRoute) {

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
                });
            }
        });
    }

    seriesClick(name) {
        this.router.navigate(['/search/c'], {queryParams: {'title': JSON.stringify(this.title), 'name': name}});
    }

}