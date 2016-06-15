import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[google-maps]'
})
export class GoogleMapsDirective implements OnInit {
  map;

  constructor(private elementRef: ElementRef) {

  }

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
  }
}