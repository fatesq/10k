import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const api = 'https://api.qinhemili.com'

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
        // private header: HttpHeaders
    ) {}

    setToken(token) {
        // this.header.set('token', token)
    }

    dologin(param) {
        return this.httpClient.post(`${api}/login/go`, param);
    }

    sms(param) {
        return this.httpClient.post(`${api}/login/sms`, param);
    }

    customerAdd(param) {
        return this.httpClient.post(`${api}/customer/valid`, param);
    }

    customerInfo(id) {
        return this.httpClient.get(`${api}/customer/detail?uid=${id}`);
    }

    brandList() {
        return this.httpClient.get(`${api}/brand/list?page=1&size=10`);
    }

    hotCar() {
        return this.httpClient.get(`${api}/hotcar/list`);
    }

    search(param) {
        return this.httpClient.post(`${api}/cars/search`, param);
    }

    brandSearch(param) {
        return this.httpClient.post(`${api}/cars/byBrand`, param);
    }

    detail(id) {
        return this.httpClient.get(`${api}/cars/detail?id=${id}`);
    }

    carAdd(param) {
        return this.httpClient.post(`${api}/shopcart/add`, param);
    }

    carList(id) {
        return this.httpClient.get(`${api}/shopcart/list?uid=${id}`);
    }

    carUp(param) {
        return this.httpClient.post(`${api}/shopcart/update`, param);
    }

    carDel(id) {
        return this.httpClient.get(`${api}/shopcart/delete?id=${id}`);
    }

    orderAdd(param) {
        return this.httpClient.post(`${api}/reserve/add`, param);
    }

    orderInfo(id) {
        return this.httpClient.get(`${api}/reserve/detail?code=${id}`);
    }

    orderUpdate(param) {
        return this.httpClient.post(`${api}/reserve/update`, param);
    }

    listByUid(param) {
        return this.httpClient.get(`${api}/reserve/listByUid?uid=${param.uid}`);
    }

    myStore(param) {
        return this.httpClient.get(`${api}/myStore/listByUid?uid=${param.uid}`);
    }

    change(param) {
        return this.httpClient.post(`${api}/myStore/change`, param);
    }

    goGetOrder(param) {
        return this.httpClient.post(`${api}/myStore/goGetOrder`, param);
    }

    addOrder(param) {
        return this.httpClient.post(`${api}/getOrder/add`, param);
    }

    carDetail(id) {
        return this.httpClient.get(`${api}/getOrder/detail?code=${id}`);
    }

    getOrder(id) {
        return this.httpClient.get(`${api}/getOrder/listByUid?uid=${id}`);
    }

    getUser(id) {
        return this.httpClient.get(`${api}/customer/detail?uid=${id}`);
    }

    byBrand(param) {
        return this.httpClient.post(`${api}/cars/byBrand`, param);
    }

    bySeries(param) {
        return this.httpClient.post(`${api}/cars/bySeries`, param);
    }

    cartNum(id) {
        return this.httpClient.get(`${api}/shopCart/count?uid=${id}`)
    }

    upload(param) {
        return this.httpClient.post(`${api}/file/upload`, param);
    }
    

}
