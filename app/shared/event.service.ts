import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import {Event} from '../shared/index';

const events = [{
  id: 1,
  name: 'My first Event',
  lat: -34.95,
  lng: 138.5999,
  description: 'Amazing Event'
}, {
  id: 2,
  name: 'My second Event',
  lat: -34.98,
  lng: 138.5999,
  description: 'Amazing Event 2'
}];

@Injectable()
export class EventService {
  get(): Observable<Event[]> {
    return Observable
      .of(events);
  }

  search(searchString: string): Observable<Event[]> {
    return Observable
      .of([events[0]]);
  }

  getById(id: number): Observable<Event> {
    return Observable.of(events[id - 1])
  }
}