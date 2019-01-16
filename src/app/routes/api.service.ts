import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
    ) {}

    dologin(param) {
        return this.httpClient.post('/login/go', param);
    }

    sms(param) {
        return this.httpClient.post('/login/sms', param);
    }

    brandList() {
        return this.httpClient.get('brand/list?page=1&size=10');
    }

    hotCar() {
        return this.httpClient.get('/hotcar/list');
    }

    search(param) {
        return this.httpClient.post('/cars/search', param);
    }

    detail(id) {
        return this.httpClient.get(`/cars/detail?id=${id}`);
    }

    carAdd(param) {
        return this.httpClient.post(`/shopcart/add`, param);
    }

    carList(id) {
        return this.httpClient.get(`/shopcart/list?uid=${id}`);
    }

    carUp(param) {
        return this.httpClient.post(`/shopcart/update`, param);
    }

    carDel(id) {
        return this.httpClient.get(`/shopcart/delete?id=${id}`);
    }

    orderAdd(param) {
        return this.httpClient.post(`/reserve/add`, param);
    }

    orderInfo(id) {
        return this.httpClient.get(`/reserve/detail?id=${id}`);
    }

    orderUpdate(param) {
        return this.httpClient.post(`/reserve/update`, param);
    }
}
