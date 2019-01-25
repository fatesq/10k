import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
selector: 'app-search-c',
templateUrl: './C.html',
styleUrls: ['./search.component.less']
})
export class SearchCComponent implements OnInit {
    title = {
        seriesName: '',
        icon: '',
        text: '',
        id: '',
    };
    showBrand = false;
    data = [];
    constructor(
        private api: ApiService,
        private router: Router,
        private bottomSheet: MatBottomSheet,
        public activeRoute: ActivatedRoute) {

        }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            if (params['name']) {
                this.title = JSON.parse(params['title']);
                const name = params['name']
                console.log()
                this.api.bySeries({seriesName: name, page: 1, size: 99}).subscribe(res => {
                    this.title['seriesName'] = name;
                    this.data = res['data'];
                    this.showBrand = true;
                });
            } else if(params['query']) {
                const query = params['query']
                this.api.search({query: query}).subscribe(res => {
                    this.data = res['data'];
                    this.showBrand = false;
                });
            }
        });
    }

    openBottomSheet(item): void {
        this.api.detail(item.id).subscribe(res => {
            this.bottomSheet.open(DetailComponent, {data: {data: res['data'] } });
        });
    }

    

    
}