import { connectToChild } from "penpal";

import { CloudAdminConfig, CloudAdminIframeApi } from './types'

export const createIframe = (config: CloudAdminConfig, accessToken: string) => {
  const id = config.websiteContainerId || 'cloudadmin-container'
  const container = document.getElementById(id)
  const iframe = document.createElement("iframe")
  container?.appendChild(iframe)
  iframe.id = "cloudadmin"
  iframe.width = "100%"
  iframe.height = "100%"
  iframe.setAttribute("style", "border: 0")
  const landingPage = config.landingPage ? `&return_to=${config.landingPage}` : ''
  iframe.src = `${config.cloudAdminWebsiteUrl}/gateway/partner?use_pm=1&access_token=${accessToken}${landingPage}`
  return iframe
}

export const connectIframe = async (config: CloudAdminConfig, iframe: HTMLIFrameElement) => {
  const connection = connectToChild<CloudAdminIframeApi>({
    debug: config.debugMode,
    iframe: iframe
  });
  return await connection.promise
}
