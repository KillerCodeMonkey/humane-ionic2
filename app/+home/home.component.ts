import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {Observable, Subscribable} from 'rxjs/Observable';
import 'rxjs/add/operator/last';

import {GoogleMapsDirective, Event, EventService} from '../shared/index';
import {EventComponent} from '../+event/index';

@Component({
  templateUrl: 'build/+home/home.component.html',
  directives: [GoogleMapsDirective]
})
export class HomeComponent {
  events: Event[] = [];
  searchString: string;
  oldSearchString: string;
  eventSource: any;
  eventSearch: any;

  constructor(
    private menu: MenuController,
    private nav: NavController,
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
    this.eventService.get().subscribe(events => {
      this.events = events;
    });
  }

  showDetail(event) {
    this.nav.push(EventComponent, {
      id: event.id
    });
  }

  private unsubscribe() {
    if (this.eventSearch) {
      this.eventSearch.unsubscribe();
      this.eventSearch = null;
    }
  }
}