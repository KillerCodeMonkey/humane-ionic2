import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import {Login, Register, User} from '../shared/index';

@Injectable()
export class AuthService {

  login(data: Login): Promise<User> {
    return Observable
      .of({
        status: 200,
        data: {
          email: 'test@test.com',
          name: 'John Doe'
        }
      })
      .toPromise()
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      });
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

  logout() {
    window.localStorage.clear();
  }

  getLogin(): User {
    return JSON.parse(window.localStorage.getItem('user'));
  }
}