import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { CenterComponent } from './center/center.component';
import { ListAComponent } from './center/ListA.component';
import { ListBComponent } from './center/ListB.component';
import { SubCarComponent } from './subCar/subCar.component';
import { OverComponent } from './over/over.component';
import { UserComponent } from './user/user.component';
import { SearchAComponent } from './search/a';
import { SearchBComponent } from './search/b';
import { SearchCComponent } from './search/c';
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';

const routes: Routes = [
  { path: '', redirectTo: '/home1', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'result', component: ResultComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home1', component: Home1Component },
  { path: 'home2', component: Home2Component },
  { path: 'search', component: SearchComponent,
  children: [
    { path: '', redirectTo: 'a', pathMatch: 'full' },
    { path: 'a', component: SearchAComponent},
    { path: 'b', component: SearchBComponent},
    { path: 'c', component: SearchCComponent},
    ]
  },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'center', component: CenterComponent },
  { path: 'ListA', component: ListAComponent },
  { path: 'ListB', component: ListBComponent },
  { path: 'subCar', component: SubCarComponent},
  { path: 'over', component: OverComponent},
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
