import { AsyncMethodReturns } from 'penpal'

import { connectIframe, createIframe } from './iframe-api'
import { CloudAdminConfig, CloudAdminIframeApi } from './types'

export const CloudAdminWebsite = (config: CloudAdminConfig) => {
  let connection: AsyncMethodReturns<CloudAdminIframeApi>

  const createWebsite = async (accessToken: string, tenant: string = '') => {
    const iframe = createIframe(config, accessToken, tenant)
    connection = await connectIframe(config, iframe)
  }

  const getAvailablePages = async () => {
    return await connection.getAvailablePages(config.partner)
  }

  const setRoute = async (route: string) => {
    await connection.setRoute(route)
  }

  return {
    createWebsite,
    getAvailablePages,
    setRoute,
  }
}
