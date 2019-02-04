import { Component, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
selector: 'app-search-a',
templateUrl: './a.html',
styleUrls: ['./search.component.less']
})
export class SearchAComponent implements OnInit {
    brand = [];
    list = [];
    dtPullToRefreshStyle = {
        display: 'flex',
        padding: '0px',
        position: 'relative',
        height: (document.documentElement.clientHeight - 60) + 'px'
    };
    constructor(
        private api: ApiService,
        private router: Router,
        public activeRoute: ActivatedRoute) {

        }

    ngOnInit() {
        this.getBrand();
        for (let i = 0; i < 26; i++) {
            this.list.push(String.fromCharCode(65 + i));
        }
    }

    getBrand() {
        this.api.initialList().subscribe(res => {
            this.brand = res['data'].map(i => {
                i.list = i.list.map(v => {
                    return {
                        icon: v.img,
                        text: v.name,
                        id: v.id,
                        initial: v.initial,
                    };
                });
                return i;
            });
            console.log(this.brand)
        });
    }

    click(event) {
        this.router.navigate(['/search/b'], {queryParams: {'data': JSON.stringify(event)}});
    }

    getExList(str) {
       return this.brand.filter(i => i.initial === str);
    }

    toHere(l) {
        document.getElementById(l).scrollIntoView();
    }
}

