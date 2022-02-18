import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeSampleComponent } from './iframe-sample/iframe-sample.component';
import { ApiSampleComponent } from "./api-sample/api-sample.component";

const routes: Routes = [
  { path: 'iframe-api', component: ApiSampleComponent },
  { path: 'iframe-api-multitenant', component: ApiSampleComponent },
  { path: 'raw-iframe', component: IframeSampleComponent },
  { path: 'raw-iframe-multitenant', component: IframeSampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
