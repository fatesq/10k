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
    name = '';
    query = '';
    title = {
        seriesName: '',
        icon: '',
        text: '',
        id: '',
    };
    showBrand = false;
    data = [];
    page = 1;
    state = {
        refreshState: {
        currentState: 'deactivate',
        drag: false
        },
        direction: '',
        endReachedRefresh: false,
        height: 600,
        directionName: 'both up and down'
    };
    dtPullToRefreshStyle = { height: this.state.height + 'px' };
    constructor(
        private api: ApiService,
        private router: Router,
        private bottomSheet: MatBottomSheet,
        public activeRoute: ActivatedRoute) {

        }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            console.log(123, this.data)
            this.data = [];
            console.log(456, this.data)
            if (params['name']) {
                this.title = JSON.parse(params['title']);
                this.name = params['name'];
                this.getListA();
            } else if (params['query']) {
                this.query = params['query'];
                this.getListB();
            }
        });
    }

    openBottomSheet(item): void {
        this.api.detail(item.id).subscribe(res => {
            this.bottomSheet.open(DetailComponent, {data: {data: res['data'] } });
        });
    }

    pullToRefresh(event) {
        console.log(event)
        if (event === 'up') {
            this.page++;
            this.state.refreshState.currentState = 'release';
            this.getInfo();
        } else {
            if (event === 'down') {
                this.data = [];
                this.page = 1;
                this.getInfo();
            }
        }
    }

    getInfo() {
        this.activeRoute.queryParams.subscribe(params => {
            if (params['name']) {
                this.getListA();
            } else if (params['query']) {
                this.getListB();
            }
        });
    }

    getListA() {
        this.api.bySeries({seriesName: this.name, page: this.page, size: 10}).subscribe(res => {
            this.title['seriesName'] = this.name;
            this.data = this.data.concat(res['data']);
            this.showBrand = true;
            this.state.refreshState.currentState = 'finish';
        });
    }

    getListB() {
        this.api.search({query: this.query}).subscribe(res => {
            this.data = this.data.concat(res['data']);
            this.showBrand = false;
            this.state.refreshState.currentState = 'finish';
        });
    }
}
