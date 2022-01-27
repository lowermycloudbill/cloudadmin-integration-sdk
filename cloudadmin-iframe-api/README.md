# CloudAdmin iframe API

**CloudAdmin iframe API** is a cross framework JS library. It allows to embed [cloudadmin.io](https://cloudadmin.io/) website into partners web app. Basically it does 3 things:
1. Requests for access token CloudAdmin API
2. Creates an iframe with authorisation
3. Handles [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) communication

## Build

```zsh
npm run build
```

Above command builds library into single file for distribution `./build/dist/cloudadmin-iframe-api.min.js`
The library has only one dependency [Penpal](https://github.com/Aaronius/penpal) for handling postMessage communication, and it is bundled in a final file. 

## Usage

1. Import library
    ```javascript
        import { CloudAdminWebsite } from './cloudadmin-iframe-api.min.js'
    ````

2. provide required config options

    ```javascript
        const cloudAdminWebsite = CloudAdminWebsite({
          /**
           * points to website (iframe content)
           */
          cloudAdminWebsiteUrl: 'https://partner-development.cloudadmin.io',
            
          /**
           * points to CloudAdmin API for access token requests
           */
          cloudAdminApiUrl: 'https://development-partner-api.cloudadmin.io/v2',
    
          /**
           * indicates client id in CloudAdmin system
           */
          clientId: 'H60617YmfoK9y0H9epBaSkdefdDNLwSj',
    
          /**
           * indicates client email in CloudAdmin system
           */
          clientEmail: 'demo-wrapper@cloudadmin.io',
    
          /**
           * partner's tag
           */
          partner: 'partner1'
        })    
    ```
    
    optional config options:
    ```javascript
        /**
         * id of iframe HTML element container, default is 'cloudadmin-container'
         */
        websiteContainerId: string
    
        /**
         * enables console debug, false by default
         */
        debugMode: boolean
    ```

3. create a HTML element container for iframe, call createWebsite and getAvailablePages methods
    ```javascript
        cloudAdminWebsite.createWebsite().then(() => {
          cloudAdminPages = cloudAdminWebsite.getAvailablePages()
        })
    ```
   * **createWebsite** process access token requests and creates an iframe in container pointed in config

   * **getAvailablePages** gets list of pages which can be used in navigation element. Each item consists of:
    
     ```javascript
       /**
        * default page title
        */
       title: string
    
       /**
        * page route (used in setRoute method)
        */
       route: string
    
       /**
        * page group, related to cloud provider (aws | azure | gcp)
        */
       group: string   
     ```
   
4. for switching pages without reloading whole app in the iframe use **setRoute** method:
    ```javascript
        cloudAdminWebsite.setRoute(route)
    ```
