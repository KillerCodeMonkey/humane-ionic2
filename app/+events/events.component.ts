import {Component, NgZone} from '@angular/core';
import {MenuController, Modal, NavController} from 'ionic-angular';
import {Observable, Subscribable} from 'rxjs/Observable';
import 'rxjs/add/operator/last';

import {GoogleMapsDirective, Event, EventService} from '../shared/index';
import {EventComponent} from '../+event/index';
import {NewEventModalComponent} from '../+new-event/index';

@Component({
  templateUrl: 'build/+events/events.component.html',
  directives: [GoogleMapsDirective]
})
export class EventsComponent {
  events: Event[] = [];
  searchString: string;
  oldSearchString: string;
  eventSource: any;
  eventSearch: any;
  test = false;

  constructor(
    private menu: MenuController,
    private nav: NavController,
    private ngZone: NgZone,
    private eventService: EventService
  ) {}

  ionViewDidEnter() {
    this.menu.enable(true, 'left');

    this.eventSource = this.eventService.get().subscribe(events => {
      this.events = events;
    });
  }

  ionViewWillLeave() {
    this.eventSource.unsubscribe();
    this.unsubscribe();
  }

  onInput() {
    if (this.searchString === this.oldSearchString) {
      return;
    }

    this.oldSearchString = this.searchString;

    if (!this.searchString) {
      this.cancel();
      return;
    }

    this.unsubscribe();

    this.eventSearch = this.eventService
      .search(this.searchString)
      .last()
      .subscribe(events => {
        this.events = events;
      });
  }

  cancel() {
    this.oldSearchString = null;
    this.unsubscribe();
    this.eventService
      .get()
      .subscribe(events => {
        this.events = events;
      });
  }

  showDetail(event) {
    this.nav.push(EventComponent, {
      id: event.id
    });
  }

  openNewModal() {
    const newModal = Modal.create(NewEventModalComponent);

    newModal.onDismiss((event) => {
      if (!event) {
        return;
      }
      const oldEvents = this.events;
      this.events = [event].concat(this.events);
    });

    this.nav.present(newModal);
  }

  private unsubscribe() {
    if (this.eventSearch) {
      this.eventSearch.unsubscribe();
      this.eventSearch = null;
    }
  }
}