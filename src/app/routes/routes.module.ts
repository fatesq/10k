import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';

const COMPONENTS = [
  LoginComponent,
  ResultComponent,
  HomeComponent,
  SearchComponent,
  OrderComponent,
  CartComponent
];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS]
})
export class RoutesModule { }
