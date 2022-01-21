export type CloudAdminConfig = {
  cloudAdminWebsiteUrl: string,
  websiteContainerId?: string,
  cloudAdminApiUrl: string,
  clientId: string,
  clientEmail: string,
  partner: string,
  debugMode?: boolean
}

export type CloudAdminPage = {
  title: string,
  route: string,
  group: string
}

export type CloudAdminIframeApi = {
  getAvailablePages(partner: string): CloudAdminPage[],
  setRoute(route: string): any  
}
