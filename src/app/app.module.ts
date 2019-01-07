import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      RoutesModule,
      BrowserAnimationsModule,
      HttpClientModule,
      SharedModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
