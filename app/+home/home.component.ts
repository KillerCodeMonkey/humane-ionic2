import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {Observable, Subscribable} from 'rxjs/Observable';
import 'rxjs/add/operator/last';

import {GoogleMapsDirective, Event, EventService} from '../shared/index';

@Component({
  templateUrl: 'build/+home/home.component.html',
  directives: [GoogleMapsDirective]
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  searchString: string;
  oldSearchString: string;
  eventSource: any;
  eventSearch: any;

  constructor(
    private menu: MenuController,
    private nav: NavController,
    private eventService: EventService
  ) {
    this.eventSource = this.eventService.get();
  }

  ngOnInit() {
    this.menu.enable(true, 'left');

    this.eventSource.subscribe(events => {
      this.events = events;
    });
  }

  onInput() {
    if (this.searchString === this.oldSearchString) {
      return;
    }
    if (!this.searchString) {
      this.cancel();
    }

    this.unsubscribe();

    this.oldSearchString = this.searchString;
    this.eventSearch = this.eventService
      .search(this.searchString)
      .last()
      .subscribe(events => {
        this.events = events;
      });
  }

  cancel() {
    this.unsubscribe();
    this.eventService
      .get();
  }

  private unsubscribe() {
    if (this.eventSearch) {
      this.eventSearch.unsubscribe();
      this.eventSearch = null;
    }
  }
}