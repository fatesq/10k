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
import { ListAComponent } from './center/ListA.component';
import { ListBComponent } from './center/ListB.component';
import { SubCarComponent } from './subCar/subCar.component';
import { OverComponent } from './over/over.component';
import { UserComponent } from './user/user.component';

const COMPONENTS = [
  LoginComponent,
  ResultComponent,
  HomeComponent,
  SearchComponent,
  OrderComponent,
  CartComponent,
  DetailComponent,
  RegisterComponent,
  CenterComponent,
  ListAComponent,
  ListBComponent,
  SubCarComponent,
  OverComponent,
  UserComponent
];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS],
  providers: [ApiService],
  entryComponents: [
    DetailComponent,
    CartComponent
  ],
})
export class RoutesModule { }
