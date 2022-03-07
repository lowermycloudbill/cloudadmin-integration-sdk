import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiSampleComponent } from './api-sample/api-sample.component';
import { IframeSampleComponent } from './iframe-sample/iframe-sample.component';
import {IntegrationComponent} from "./integration/integration.component";
import {TenantsSidebarComponent} from "./tenants-sidebar/tenants-sidebar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppInterceptorService} from "./app-interceptor.service";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApiSampleComponent,
    IframeSampleComponent,
    IntegrationComponent,
    TenantsSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
