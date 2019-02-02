import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatBottomSheetModule} from '@angular/material';
import {ClipboardModule} from 'ngx-clipboard';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdMobileModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatBottomSheetModule,
    ClipboardModule,
    FileUploadModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdMobileModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    ClipboardModule,
    FileUploadModule
  ],
})
export class SharedModule { }


