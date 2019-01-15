import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
    ) {}

    dologin(param) {
        return this.httpClient.post('/login/go', param)
    }

    sms(param) {
        return this.httpClient.post('/login/sms', param)
    }

    brandList() {
        return this.httpClient.get('brand/list?page=1&size=10')
    }

    hotCar() {
        return this.httpClient.get('/hotcar/list')
    }
    
}