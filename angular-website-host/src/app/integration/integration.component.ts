import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ApiBackendService} from "../api-backend.service";
// @ts-ignore
import { CloudAdminConfig, CloudAdminPage } from '../../assets/cloudadmin-iframe-api.js'
import {TenantPage} from "../tenants-sidebar/types";
import {IntegrationProperty, Tenant} from "./types";
import {CookieService} from "ngx-cookie-service";

@Component({
  providers: [
    ApiBackendService,
  ],
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
})

export class IntegrationComponent implements OnInit {
  tenants: Tenant[] = []
  currentTenantId: string = ''
  currentTenantName: string = ''

  cloudAdminPages: CloudAdminPage[] = []
  tenantsPages: TenantPage[] = []
  activeRoute: string = ''
  hostAccessToken: string | undefined

  @Input('apiConfig') config: CloudAdminConfig
  @Output('onAccessTokenChange') onAccessTokenChange = new EventEmitter<IntegrationProperty>();

  constructor(private apiBackend: ApiBackendService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.apiBackend.getAccessToken(this.config).subscribe(res => {
      this.hostAccessToken = res.access_token;
      this.cookie.set('accessToken', this.hostAccessToken);
      this.apiBackend.getTenantsList(this.config).subscribe(res => {
        this.tenants = res
        if (this.tenants.length > 0) {
          this.cloudAdminPages.push({
            title: 'Multi tenant',
            route: '/tangoe/integration',
          })
          const activeTenant = this.tenants.filter(tenant => tenant.selected)[0]
          this.onTenantChange(activeTenant.id);
        } else {
          this.cloudAdminPages.push({
            title: 'IaaS Optimization',
            route: '/tangoe/integration',
          })

          this.onAccessTokenChange.emit({'token': this.hostAccessToken});
        }
        this.activeRoute = '/tangoe/integration';
        })
    });
  }

  setRoute(route: string) {
    this.activeRoute = route
  }

  onTenantChange(id: string) {
    if (this.hostAccessToken) {
      this.apiBackend.getTenantDemo(this.config, id).subscribe(res => {
      this.tenants = res.tenants
      this.currentTenantName = this.tenants.filter(item => item.id === id)[0].short_name
      this.currentTenantId = id
      this.updateTenantPages();
      this.onAccessTokenChange.emit({ 'token': this.hostAccessToken, 'tenant': this.currentTenantId})
      });
    }
  }

  private updateTenantPages() {
    this.tenantsPages = []
    this.tenants.map(tenant => this.tenantsPages.push({
      name: tenant.short_name,
      id: tenant.id,
      active: tenant.selected
    }))
  }
}
