# App-Auth JS Angular Demo

## Prerequisites
1. Gluu Server 4.0
1. Node JS >= 10.x.x

## Installation
1. Clone this repo

        $ git clone https://github.com/ldeveloperl1985/angular-app-auth-demo.git

1. Install dependency

       $ sudo npm install -g @angular/cli
       $ cd angular-app-auth-demo
       $ npm install

## Start Project

      $ cd angular-app-auth-demo
      $ npm start

It will start you app on `http://localhost:4200`.

## Configuration

Use [environment.ts](https://github.com/ldeveloperl1985/angular-app-auth-demo/blob/master/src/environments/environment.ts) for OP Server and Client configuration.

## Tips for other SPA Application

1. You need to install first `npm install --save @openid/appauth`.
1. `appauth-js` by default provide the PKCE check.
1. For any operation you need to first fetch configuration `AuthorizationServiceConfiguration.fetchFromIssuer(environment.openid_connect_url)`. Take a look on code [here](https://github.com/ldeveloperl1985/angular-app-auth-demo/blob/master/src/app/home/home.component.ts#L27). you will get idea.
1. The first thing is to generate the authorization url and redirect to OP server for auth. For this please check the [home.component.ts](https://github.com/ldeveloperl1985/angular-app-auth-demo/blob/master/src/app/home/home.component.ts). 
     I've imported the modules like below from appauth-js lib. I think this is the same way for other SPA technologies.
     ```
     import {
         AuthorizationServiceConfigurationJson,
         AuthorizationServiceConfiguration,
         AuthorizationRequest, RedirectRequestHandler
     } from '@openid/appauth';
     ```
1. Second step is after OP auth, OP redirect back to your SPA application to get code from URL and request for `access_token`.
      Check [redirect.component.ts](https://github.com/ldeveloperl1985/angular-app-auth-demo/blob/master/src/app/redirect/redirect.component.ts) for this. 
      Flow start from `this.authorizationHandler.completeAuthorizationRequestIfPossible();` which is responsible for get `code` and `state` from URL and further flow.

## Important

There is bug in appauth js to get code and state from the URL. it is only read this when you have `#` in URL. Current days all the SPA don't really recommended to use `#` in URL but this lib need `#`.

If you don't want to put `#` in URL then you need to manually get code from URL.

Currently I set `useHash: true` for my angular app. here (app-routing.module.ts)[https://github.com/ldeveloperl1985/angular-app-auth-demo/blob/master/src/app/app-routing.module.ts#L14]
