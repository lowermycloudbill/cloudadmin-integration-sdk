import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
// @ts-ignore
import { CloudAdminWebsite, CloudAdminConfig, CloudAdminIframeApi, CloudAdminPage } from '../../assets/cloudadmin-iframe-api.min.js'
import {ActivatedRoute} from "@angular/router";
// import { CloudAdminWebsite, CloudAdminConfig } from '../../../../cloudadmin-iframe-api/src'

@Component({
  selector: 'app-iframe-sample',
  templateUrl: './iframe-sample.component.html',
  styleUrls: ['./iframe-sample.component.scss']
})
export class IframeSampleComponent implements OnInit {

  config: CloudAdminConfig = {
    // cloudAdminWebsiteUrl: 'https://iframe-development.cloudadmin.io',
    cloudAdminWebsiteUrl: 'http://localhost:8001',
    cloudAdminApiUrl: 'https://development-tangoe-api.cloudadmin.io/v2',
    clientId: 'H60617YmfoK9y0H9epBaSkdefdDNLwSj',
    // clientEmail: 'demo-wrapper@cloudadmin.io',
    clientEmail: 'demo-wrapper-external@cloudadmin.io',
    partner: 'tangoe',
    landingPage: '/tangoe/integration',
    debugMode: true
  }

  cloudAdminPages: CloudAdminPage[] = [
    {
      title: 'AWS',
      route: '/admin/aws',
    },
    {
      title: 'Azure',
      route: '/admin/azure',
    }
  ]
  activeRoute: string = ''
  accessToken?: string
  iframeSrc?: SafeResourceUrl

  private cloudAdminWebsite: CloudAdminIframeApi

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    if(route.snapshot.url[0].path.endsWith('multitenant')) {
      this.config.clientEmail = 'demo-wrapper@cloudadmin.io'
      this.cloudAdminPages.push(
        {
          title: 'Multi tenant',
          route: '/tangoe/integration',
        }
      )
    }
  }

  ngOnInit(): void {
    this.cloudAdminWebsite = CloudAdminWebsite(this.config)

    this.cloudAdminWebsite.getAccessToken().then((accessToken: string) => {
      this.accessToken = accessToken
      this.iframeSrc = this.buildIframeUrl('/admin')
    })
  }

  setRoute(route: string) {
    this.activeRoute = route
    this.iframeSrc = this.buildIframeUrl(route)
  }

  private buildIframeUrl(route: string): SafeResourceUrl {
    const { config, accessToken } = this
    const url = `${config.cloudAdminWebsiteUrl}/gateway/partner?access_token=${accessToken}&return_to=${route}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
