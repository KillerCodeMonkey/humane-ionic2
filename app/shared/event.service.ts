import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import {Event} from '../shared/index';

@Injectable()
export class EventService {
  get(): Observable<Event[]> {
    return Observable
      .of([{
        name: 'My first Event',
        lat: 110,
        lng: 112,
        description: 'Amazing Event'
      }, {
        name: 'My second Event',
        lat: 110.5,
        lng: 112.8,
        description: 'Amazing Event 2'
      }]);
  }

  search(searchString: string): Observable<Event[]> {
    return Observable
      .of([{
        name: 'My first Event',
        lat: 110,
        lng: 112,
        description: 'Amazing Event'
      }]);
  }
}