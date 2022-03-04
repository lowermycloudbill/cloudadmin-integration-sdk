import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
import { CloudAdminWebsite, CloudAdminConfig, CloudAdminIframeApi } from '../../assets/cloudadmin-iframe-api.min.js'
import {ApiBackendService} from "../api-backend.service";
import {IntegrationProperty} from "../integration/types";
// import { CloudAdminWebsite, CloudAdminConfig } from '../../../../cloudadmin-iframe-api/src'

@Component({
  providers: [
    ApiBackendService,
  ],
  selector: 'app-api-sample',
  templateUrl: './api-sample.component.html',
  styleUrls: ['./api-sample.component.scss']
})
export class ApiSampleComponent implements OnInit {

  config: CloudAdminConfig = {
    cloudAdminWebsiteUrl: 'https://tangoe-development.cloudadmin.io',
    // cloudAdminWebsiteUrl: 'https://iframe-development.cloudadmin.io',
    // cloudAdminWebsiteUrl: 'http://localhost:8001',
    cloudAdminApiUrl: 'https://development-tangoe-api.cloudadmin.io/v2',
    // cloudAdminApiUrl: 'https://development-api.cloudadmin.io/v2',
    clientId: 'H60617YmfoK9y0H9epBaSkdefdDNLwSj',
    // clientEmail: 'demo-wrapper@cloudadmin.io',
    clientEmail: 'demo-wrapper-external@cloudadmin.io',
    partner: 'tangoe',
    landingPage: '/admin',
    debugMode: true
  }

  private cloudAdminWebsite: CloudAdminIframeApi

  constructor(private apiBackend: ApiBackendService, private route: ActivatedRoute) {
    if(route.snapshot.url[0].path.endsWith('multitenant')) {
      this.config.clientEmail = 'demo-wrapper@cloudadmin.io'
    }
  }

  ngOnInit(): void {
    this.cloudAdminWebsite = CloudAdminWebsite(this.config)
  }

  onAccessTokenChange({token, tenant= ''}: IntegrationProperty): void {
    this.cloudAdminWebsite.createWebsite(token, tenant)
  }
}
