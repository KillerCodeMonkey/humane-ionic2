import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {Event, EventService} from '../shared/index';

@Component({
  templateUrl: 'build/+event/event.component.html'
})
export class EventComponent {
  event: Event;
  id: number;

  constructor(
    private eventService: EventService,
    private navParams: NavParams
  ) {}

  ionViewDidEnter() {
    this.id = this.navParams.get('id');

    const subscription = this.eventService.getById(this.id).subscribe(event => {
      this.event = event;

      subscription.unsubscribe();
    });
  }
}