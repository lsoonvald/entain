import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { AuthGuardService } from './features/auth/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: AuthGuardService },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
