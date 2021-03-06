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
      /**
       * points to website (iframe content)
       */
      cloudAdminWebsiteUrl: string
    
      /**
       * points to CloudAdmin API for access token requests
       */
      cloudAdminApiUrl: string
    
      /**
       * indicates client id in CloudAdmin system
       */
      clientId: string
    
      /**
       * indicates client email in CloudAdmin system
       */
      clientEmail: string
    
      /**
       * partner's tag
       */
      partner: string
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

3. create a HTML element container for iframe
   ```html
   <div id="cloudadmin-container"></div>
   ```

4. create an iframe and get available pages
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
   
5. for switching pages without reloading whole app in the iframe use **setRoute** method:
    ```javascript
    cloudAdminWebsite.setRoute(route)
    ```
