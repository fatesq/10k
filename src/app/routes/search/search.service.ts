import { Injectable, EventEmitter} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  numChange: EventEmitter<number> = new EventEmitter();
  constructor() { }
  emitNum(number) {
    this.numChange.emit(number);
  }
  getNum() {
    return this.numChange;
  }

}
