import {CloudAdminConfig} from '../../../cloudadmin-iframe-api/src/types'
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Tenant} from "./integration/types";


interface Token {
  access_token: string
}

interface TenantDemo {
  tenants: Tenant[]
}

@Injectable()
export class ApiBackendService {

  constructor(private http: HttpClient) {}

  public getAccessToken = (config: CloudAdminConfig,) => {

    const URL_GET_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/token`

    return this.http.post<Token>(URL_GET_TOKEN, {
      client_id: config.clientId,
      email: config.clientEmail,
      session_id: 'hokus-pokus'
    })
  }

  public validateAccessToken = (config: CloudAdminConfig, accessToken: string) => {

    const URL_VALIDATE_TOKEN = `${config.cloudAdminApiUrl}/token/validate`

    return this.http.post(URL_VALIDATE_TOKEN, {
      client_id: config.clientId,
      access_token: accessToken
    })
  }

  public getTenantsList = (config: CloudAdminConfig) => {

    const URL_CUSTOMERS_LIST = `${config.cloudAdminApiUrl}/tangoe/user/customers`

    return this.http.get<Tenant[]>(URL_CUSTOMERS_LIST)
  }

  public getTenantDemo = (config: CloudAdminConfig, customerId: string) => {

      const URL_CUSTOMER_DEMO = `${config.cloudAdminApiUrl}/tangoe/user/customer/demo`

      return this.http.post<TenantDemo>(URL_CUSTOMER_DEMO, {
        id: customerId
      })
  }

  public getTenantToken = (config: CloudAdminConfig, customerId: string) => {

      const URL_CUSTOMER_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/customer/token`

      return this.http.post<Token>(URL_CUSTOMER_TOKEN, {
        id: customerId
      })
  }
}
