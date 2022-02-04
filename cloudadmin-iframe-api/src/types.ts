export type CloudAdminConfig = {
  /**
   * points to website (iframe content)
   */
  cloudAdminWebsiteUrl: string,

  /**
   * id of iframe HTML element container, default is 'cloudadmin-container'
   */
  websiteContainerId?: string,

  /**
   * points to CloudAdmin API for access token requests
   */
  cloudAdminApiUrl: string,

  /**
   * indicates client id in CloudAdmin system
   */
  clientId: string,

  /**
   * indicates client email in CloudAdmin system
   */
  clientEmail: string,

  /**
   * partner's tag
   */
  partner: string,

  /**
  * page opened on start
  */
  landingPage?: string,

  /**
   * enables console debug, false by default
   */
  debugMode?: boolean
}

export type CloudAdminPage = {
      /**
       * default page title
       */
      title: string,

      /**
       * page route (used in setRoute method)
       */
      route: string,

      /**
       * page group, related to cloud provider (aws | azure | gcp)
       */
      group: string
}

export type CloudAdminIframeApi = {
  getAvailablePages(partner: string): CloudAdminPage[],
  setRoute(route: string): void
}
