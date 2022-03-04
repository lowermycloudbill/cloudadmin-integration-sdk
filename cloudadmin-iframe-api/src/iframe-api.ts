import { connectToChild } from "penpal";

import { CloudAdminConfig, CloudAdminIframeApi } from './types'

export const createIframe = (config: CloudAdminConfig, accessToken: string, tenant:string = '') => {
  const id = config.websiteContainerId || 'cloudadmin-container'
  const container = document.getElementById(id)
  let iframe = document.getElementById("cloudadmin") as HTMLIFrameElement

  if (!iframe) {
    iframe = document.createElement("iframe")
    container?.appendChild(iframe)
    iframe.id = "cloudadmin"
    iframe.width = "100%"
    iframe.height = "100%"
    iframe.setAttribute("style", "border: 0")
  }

  const landingPage = config.landingPage ? `&return_to=${config.landingPage}` : ''
  const tenantQuery = tenant ? `&tenant=${tenant}` : ''

  iframe.src = `${config.cloudAdminWebsiteUrl}/gateway/partner?use_pm=1&access_token=${accessToken}${landingPage}${tenantQuery}`
  return iframe
}

export const connectIframe = async (config: CloudAdminConfig, iframe: HTMLIFrameElement) => {
  const connection = connectToChild<CloudAdminIframeApi>({
    debug: config.debugMode,
    iframe: iframe
  });
  return await connection.promise
}
