import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core';

import {Event} from './event.model';


@Directive({
  selector: '[google-maps]'
})
export class GoogleMapsDirective implements OnInit, OnChanges, OnDestroy {
  map;
  markers = [];
  @Input() events: Event[] = [];
  @Output() markerClicked = new EventEmitter<Event>();

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

  ngOnDestroy() {
    this.clearMarkers();
  }

  setMarkers() {
    let marker;
    this.clearMarkers();

    for (let i = 0; i < this.events.length; i = i + 1) {
      marker = new google.maps.Marker({
        position: {lat: this.events[i].lat, lng: this.events[i].lng},
        map: this.map
      });
      // add additional data to marker
      marker.eventData = this.events[i];

      marker.listener = marker.addListener('click', () => {
        this.map.setZoom(20);
        this.map.setCenter(marker.getPosition());

        this.markerClicked.emit(marker.eventData);
      });
      this.markers.push(marker);
    }

    if (this.markers.length) {
      this.map.setCenter(this.markers[0].getPosition());
    }
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i = i + 1) {
      this.markers[i].listener.remove();
      this.markers[i].setMap(null);
    }

    this.markers = [];
  }
}