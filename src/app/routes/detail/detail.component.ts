import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<DetailComponent>) {}

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
