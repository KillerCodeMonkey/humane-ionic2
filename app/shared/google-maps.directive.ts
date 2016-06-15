import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core';

import {Event} from './event.model';


@Directive({
  selector: '[google-maps]'
})
export class GoogleMapsDirective implements OnInit, OnChanges {
  map;
  markers = [];
  @Input() events: Event[] = [];
  @Output() markerClicked = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const latLng = new google.maps.LatLng(-34.9290, 138.6010);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.elementRef.nativeElement.style.height = '100%';
    this.elementRef.nativeElement.style.width = '100%';

    this.map = new google.maps.Map(this.elementRef.nativeElement, mapOptions);

    this.setMarkers();
  }

  ngOnChanges(changes: {[prop: string]: SimpleChange}) {
    if (!this.map) {
      return;
    }
    this.setMarkers();
  }

  setMarkers() {
    let marker;

    this.clearMarkers();

    for (let i = 0; i < this.events.length; i = i + 1) {
      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.events[i].lat, this.events[i].lng),
        map: this.map
      });
      this.markers.push(marker);
    }
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i = i + 1) {
      this.markers.setMap(null);
    }

    this.markers = [];
  }
}