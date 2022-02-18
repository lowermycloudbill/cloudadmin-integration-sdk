import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiSampleComponent } from './api-sample/api-sample.component';
import { IframeSampleComponent } from './iframe-sample/iframe-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApiSampleComponent,
    IframeSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
