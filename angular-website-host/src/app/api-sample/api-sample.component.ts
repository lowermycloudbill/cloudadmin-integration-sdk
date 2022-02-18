import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
import { CloudAdminWebsite, CloudAdminConfig, CloudAdminIframeApi } from '../../assets/cloudadmin-iframe-api.min.js'
// import { CloudAdminWebsite, CloudAdminConfig } from '../../../../cloudadmin-iframe-api/src'

@Component({
  selector: 'app-api-sample',
  templateUrl: './api-sample.component.html',
  styleUrls: ['./api-sample.component.scss']
})
export class ApiSampleComponent implements OnInit {

  config: CloudAdminConfig = {
    // cloudAdminWebsiteUrl: 'https://iframe-development.cloudadmin.io',
    cloudAdminWebsiteUrl: 'http://localhost:8001',
    cloudAdminApiUrl: 'https://development-tangoe-api.cloudadmin.io/v2',
    // cloudAdminApiUrl: 'https://development-api.cloudadmin.io/v2',
    clientId: 'H60617YmfoK9y0H9epBaSkdefdDNLwSj',
    // clientEmail: 'demo-wrapper@cloudadmin.io',
    clientEmail: 'demo-wrapper-external@cloudadmin.io',
    partner: 'tangoe',
    landingPage: '/admin',
    debugMode: true
  }

  cloudAdminPages?: Promise<any>
  activeRoute: string = ''
  private cloudAdminWebsite: CloudAdminIframeApi

  constructor(private route: ActivatedRoute) {
    if(route.snapshot.url[0].path.endsWith('multitenant')) {
      this.config.clientEmail = 'demo-wrapper@cloudadmin.io'
    }
  }

  ngOnInit(): void {
    this.cloudAdminWebsite = CloudAdminWebsite(this.config)

    this.cloudAdminWebsite.createWebsite().then(() => {
      this.cloudAdminPages = this.cloudAdminWebsite.getAvailablePages()
    })

  }

  setRoute(route: string) {
    this.activeRoute = route
    this.cloudAdminWebsite.setRoute(route)
  }
}
