import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

const COMPONENTS = [
  LoginComponent,
  ResultComponent
];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS]
})
export class RoutesModule { }
