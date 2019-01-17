import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { StartService } from './start.service';

export function StartupServiceFactory(
  startupService: StartService,
): Function {
  return () => startupService.load();
}

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
   providers: [{
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartService],
    multi: true,
  }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
