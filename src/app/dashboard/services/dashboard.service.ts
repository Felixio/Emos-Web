import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { HomeDetails } from '../models/home.details.interface';
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { User } from '../models/user.interface';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string ;

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }


  getUsers(): Observable<Array<User>> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + '/dashboard/users', {headers})
    .map(response => response.json())
    .catch(this.handleError);
}

  getHomeDetails(): Observable<HomeDetails> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + '/dashboard/home', {headers})
      .map(response => response.json())
      .catch(this.handleError);
  }
}
