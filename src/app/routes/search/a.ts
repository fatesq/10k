import { Component, OnInit } from '@angular/core';
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
    constructor(
        private api: ApiService,
        private router: Router,
        public activeRoute: ActivatedRoute) {

        }

    ngOnInit() {
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

    click(event) {
        this.router.navigate(['/search/b'], {queryParams: {'data': JSON.stringify(event.data)}});
    }
}