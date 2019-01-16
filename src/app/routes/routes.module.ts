import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './api.service'
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
import { CenterComponent } from './center/center.component';

const COMPONENTS = [
  LoginComponent,
  ResultComponent,
  HomeComponent,
  SearchComponent,
  OrderComponent,
  CartComponent,
  DetailComponent,
  RegisterComponent,
  CenterComponent
];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS],
  providers: [ApiService],
  entryComponents: [
    DetailComponent
  ],
})
export class RoutesModule { }
