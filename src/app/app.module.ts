import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { NoopInterceptor } from './noop';

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
      HttpClientModule,
      BrowserModule,
      RoutesModule,
      BrowserAnimationsModule,
      SharedModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
      {
         provide: APP_INITIALIZER,
         useFactory: StartupServiceFactory,
         deps: [StartService],
         multi: true,
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
