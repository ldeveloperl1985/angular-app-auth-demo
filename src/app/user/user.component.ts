import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  accessToken: string = null;
  userInfo: any = null;
  error: any = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_token') || null;
    if (!this.accessToken) {
      return;
    }

    this.http.get(environment.openid_connect_url + '/oxauth/restv1/userinfo', {headers: {authorization: 'Bearer ' + this.accessToken}})
      .subscribe((response) => {
        this.userInfo = response;
      });
  }

}
