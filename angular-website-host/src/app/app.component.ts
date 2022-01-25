import { Component, OnInit } from '@angular/core';
// import { CloudAdminWebsite } from '../../../cloudadmin-iframe-api/lib'
import { CloudAdminWebsite } from '../assets/lib'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cloudAdminPages?: Promise<any>
  activeRoute: string = ''
  private cloudAdminWebsite: any

  ngOnInit(): void {
    this.cloudAdminWebsite = CloudAdminWebsite({
      cloudAdminWebsiteUrl: 'https://tangoe-development.cloudadmin.io',
      cloudAdminApiUrl: 'https://development-tangoe-api.cloudadmin.io/v2',
      // cloudAdminApiUrl: 'https://development-api.cloudadmin.io/v2',
      clientId: 'H60617YmfoK9y0H9epBaSkdefdDNLwSj',
      clientEmail: 'demo-integration@cloudadmin.io',
      partner: 'tangoe',
      debugMode: true
    })

    this.cloudAdminWebsite.createWebsite().then(() => {
      this.cloudAdminPages = this.cloudAdminWebsite.getAvailablePages()
    })

  }

  setRoute(route: string) {
    this.activeRoute = route
    this.cloudAdminWebsite.setRoute(route)
  }
}
