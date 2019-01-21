import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listB',
  templateUrl: './ListB.html',
  styleUrls: ['./center.component.less']
})
export class ListBComponent implements OnInit {
  data =[];
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getList()
  }

  del (i) {
    if (this.data[i].amount > 1) {
      this.data[i].amount --;
      this.changeCar(this.data[i].id, this.data[i].amount,i);
    } else {
      this.api.carDel(this.data[i].id).subscribe(res => {
          this.getList();
      });
    }
  }
  add (i) {
    this.data[i].amount ++;
    this.changeCar( this.data[i].id, this.data[i].amount,i);
  }

  changeCar(id, count, i) {
    this.api.goGetOrder({
      uid: localStorage['uid'],
      cars: [{
        amount: count,
        storeId: id
      }]
    }).subscribe(res => {
      // this.getList();
      if (res['code'] == 200) {
        res['data'][0].check = true;
        this.data[i] = res['data'][0]
      }
    });
  }

  getList() {
    this.api.myStore({
      uid: localStorage['uid']
    }).subscribe(res => {
        if (res['code'] == 200) {
          this.data = res['data'].map(res => {
            res['check'] = false;
            return res;
          })
        }
    }) 
  }

  updata(i) {
    this.data[i].check = true;
  }

  submit() {
    this.api.getOrder({
      uid: localStorage['uid'],
      cars: this.data.filter(i => i.check).map(i => {
        return {
          storeId: i.id,
          amount: i.amount
        }
      })
    }).subscribe(res => {

    })
  }

}