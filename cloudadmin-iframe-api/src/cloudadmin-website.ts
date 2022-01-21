import { CloudAdminConfig, CloudAdminIframeApi } from './types'
import { getAccessToken } from './rest-api'
import { createIframe, connectIframe } from './iframe-api'
import { AsyncMethodReturns } from 'penpal'

export const CloudAdminWebsite = (config: CloudAdminConfig) => {
  let connection: AsyncMethodReturns<CloudAdminIframeApi>

  const createWebsite = async () => {
    const accessToken = await getAccessToken(config)
    const iframe = createIframe(config, accessToken)
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
    setRoute
  }  
}