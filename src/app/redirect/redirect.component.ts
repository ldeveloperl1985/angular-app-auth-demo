import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  TokenRequest,
  BaseTokenRequestHandler,
  GRANT_TYPE_AUTHORIZATION_CODE, AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson
} from '@openid/appauth';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  code: string;
  tokenHandler: any = null;
  configuration: AuthorizationServiceConfigurationJson;
  error: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.tokenHandler = new BaseTokenRequestHandler();
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams.code;

    if (!this.code) {
      this.error = 'Unable to get authorization code';
      return;
    }
    const request = new TokenRequest({
      client_id: environment.client_id,
      redirect_uri: environment.redirect_uri,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code: this.code,
      refresh_token: undefined,
    });

    AuthorizationServiceConfiguration.fetchFromIssuer(environment.openid_connect_url)
      .then((response: any) => {
        this.configuration = response;
        return this.tokenHandler.performTokenRequest(this.configuration, request);
      })
      .then((response) => {
        localStorage.setItem('access_token', response);
        this.router.navigate(['/user']);
      })
      .catch(error => {
        this.error = error;
      });
  }

}
