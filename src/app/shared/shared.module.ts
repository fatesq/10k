import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdMobileModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule
  ],
  declarations: [],
  exports: [
    RouterModule,
    FormsModule,
    NgZorroAntdMobileModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule
  ],
})
export class SharedModule { }
