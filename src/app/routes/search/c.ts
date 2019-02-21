import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Toast } from 'ng-zorro-antd-mobile';

@Component({
selector: 'app-search-c',
templateUrl: './C.html',
styleUrls: ['./search.component.less'],
providers: [Toast]
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
        direction: 'up',
        endReachedRefresh: false,
        height: 600,
        directionName: 'both up and down'
    };
    dtPullToRefreshStyle = { 
        height: (document.documentElement.clientHeight - 60) + 'px'// this.state.height + 'px'
    };
    loading = false;
    constructor(
        private api: ApiService,
        private router: Router,
        private _toast: Toast,
        private bottomSheet: MatBottomSheet,
        public activeRoute: ActivatedRoute) {

        }

    ngOnInit() {
        // document.addEventListener('touchmove', function(e) {
        //     e.preventDefault();
        // });
        const that = this;
        window.addEventListener('scroll', this.menu);

        this.activeRoute.queryParams.subscribe(params => {
            this.data = [];
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
            this.loading = false;
            if (this.page > 2 && res['data'].length < 10) {
                Toast.show('没有更多了...', 1000);
            }
        });
    }

    getListB() {
        this.api.search({query: this.query, page: this.page, size: 10}).subscribe(res => {
            this.data = this.data.concat(res['data']);
            this.showBrand = false;
            this.state.refreshState.currentState = 'finish';
            this.loading = false;
            if (this.page > 2 && res['data'].length < 10) {
                Toast.show('没有更多了...', 1000);
            }
        });
    }

    getScrollHeight() {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }

    menu =()=> {
        if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            //debugger
            this.loading = true;
            Toast.loading('加载中...', 1000)
            this.pullToRefresh('up')
        }
    }

    getScrollTop() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

    getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    goPage(){
        this.pullToRefresh('up')
    }

}
