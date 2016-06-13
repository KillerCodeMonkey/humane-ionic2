import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import {Login} from '../shared/index';
import {Register} from '../shared/index';

@Injectable()
export class AuthService {
  private currentLogin: Login;

  login(data: Login) {
    return Observable
      .of({
        status: 200,
        data: {
          email: 'test@test.com',
          name: 'John Doe'
        }
      })
      .toPromise();
  }

  register(data: Register) {
    return Observable
      .of({
        status: 200,
        data: {
          email: 'test@test.com',
          name: 'John Doe'
        }
      })
      .toPromise();
  }

  getLogin() {
    return this.currentLogin;
  }
}