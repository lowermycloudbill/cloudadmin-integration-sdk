import {CloudAdminConfig} from '../../../cloudadmin-iframe-api/src/types'
import {Injectable} from "@angular/core";

@Injectable()
export class ApiBackendService {
  private request = (method: string, accessToken?: string) => ({
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
    }
  })

  private api = async (method: string, url: string, payload?: any, accessToken?: string) => {
    const response = await fetch(url, {
      ...this.request(method, accessToken),
      ...(payload ? {body: JSON.stringify(payload)} : {})
    })
    if (response.headers.get('content-type') === 'application/json') {
      return response.json()
    }
    return response.status >= 200 && response.status < 300;
  }

  public getAccessToken = async (config: CloudAdminConfig,) => {

    const URL_GET_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/token`
    const URL_VALIDATE_TOKEN = `${config.cloudAdminApiUrl}/token/validate`

    const response = await this.api('post', URL_GET_TOKEN, {
      client_id: config.clientId,
      email: config.clientEmail,
      session_id: 'hokus-pokus'
    })
    const result = await this.api('post', URL_VALIDATE_TOKEN, {
      client_id: config.clientId,
      access_token: response.access_token
    })
    return result ? response.access_token : null
  }

  public getTenantsList = async (config: CloudAdminConfig, accessToken: string) => {

    const URL_CUSTOMERS_LIST = `${config.cloudAdminApiUrl}/tangoe/user/customers`

    return await this.api('get', URL_CUSTOMERS_LIST, null, accessToken)
  }

  public getTenantDemo = async (config: CloudAdminConfig, customerId: string, accessToken: string) => {

      const URL_CUSTOMER_DEMO = `${config.cloudAdminApiUrl}/tangoe/user/customer/demo`

      return await this.api('post', URL_CUSTOMER_DEMO, {
        id: customerId
      }, accessToken)
  }

  public getTenantToken = async (config: CloudAdminConfig, customerId: string, accessToken: string) => {

      const URL_CUSTOMER_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/customer/token`

      return await this.api('post', URL_CUSTOMER_TOKEN, {
        id: customerId
      }, accessToken)
  }
}
