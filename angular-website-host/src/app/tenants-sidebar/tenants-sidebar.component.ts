import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApiBackendService} from "../api-backend.service";
// @ts-ignore
import { CloudAdminConfig, CloudAdminPage } from '../../assets/cloudadmin-iframe-api.min.js'

@Component({
  selector: 'tenants-sidebar',
  templateUrl: './tenants-sidebar.component.html',
  styleUrls: ['./tenants-sidebar.component.scss'],
})

export class TenantsSidebarComponent {

  @Input() pages: any[] = []
  @Input() tenantName: string = ''
  @Input() tenantId: string = ''
  @Output() onTenantChange = new EventEmitter<string>();

  onShowTenants() {
    const sidebar = document.getElementsByClassName('tenants-sidebar')[0] as HTMLDivElement
    sidebar.classList.remove('hidden');
  }

  onHideTenants() {
    const sidebar = document.getElementsByClassName('tenants-sidebar')[0] as HTMLDivElement
    sidebar.classList.add('hidden');
  }
}
