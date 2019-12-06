import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {
  AuthorizationServiceConfigurationJson,
  AuthorizationServiceConfiguration,
  AuthorizationNotifier,
  AuthorizationRequest,
  RedirectRequestHandler
} from '@openid/appauth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  configuration: AuthorizationServiceConfigurationJson = null;
  error: any = null;
  authorizationHandler: any = null;
  notifier: any = null;
  request: any = null;
  response: any = null;
  code: string = null;

  constructor() {
    this.authorizationHandler = new RedirectRequestHandler();
    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    this.notifier.setAuthorizationListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error);
      if (response) {
        this.request = request;
        this.response = response;
        this.code = response.code;
        console.log(`Authorization Code  ${response.code}`);
      }
    });
  }

  ngOnInit() {
  }

  redirect() {
    AuthorizationServiceConfiguration.fetchFromIssuer(environment.openid_connect_url)
      .then((response: any) => {
        this.configuration = response;
        const authRequest = new AuthorizationRequest({
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope,
          response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
          state: undefined,
          // extras: environment.extra
        });
        this.authorizationHandler.performAuthorizationRequest(this.configuration, authRequest);
      })
      .catch(error => {
        this.error = error;
      });

  }
}
