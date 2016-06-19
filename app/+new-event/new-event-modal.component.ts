import {Component, NgZone, OnInit} from '@angular/core';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';

import {Loading, NavController, ViewController} from 'ionic-angular';

import {EventService} from '../shared/index';
import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'build/+new-event/new-event-modal.component.html'
})
export class NewEventModalComponent implements OnInit {
  form: ControlGroup;
  startDate = (new Date()).toISOString();
  endDate = (new Date(1000 * 3600 * 24 * 100 + Date.now())).toISOString();
  position: any;
  geocoding = false;
  saving = false;
  addresses = [];
  private addressControl: Control;
  private debounceTime = 800;
  private geocoder = new google.maps.Geocoder();

  constructor(
    private ngZone: NgZone,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: [this.startDate, Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      tags: ['']
    });

    this.addressControl = (<Control>this.form.controls['address']);
  }

  ngOnInit() {
    this.addressControl
      .valueChanges
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .subscribe((addressString) => this.searchAdress(addressString));
  }

  searchAdress(address: string) {
    if (!address) {
      return;
    }

    this.addresses = [];
    this.geocoding = true;

    this.ngZone.runOutsideAngular(() => {
      this.geocoder.geocode({address: address}, (results, status) => {
        this.ngZone.run(() => {
          this.geocoding = false;

          if (status !== google.maps.GeocoderStatus.OK || !results.length) {
            return;
          }

          if (results.length === 1) {
            this.addressControl.updateValue(results[0].formatted_address);
            this.position = results[0].geometry.location;
          }

          if (results.length > 1) {
            this.addresses = results;
          }
        });
      });
    });
  }

  handleAddressChange(address) {
    this.position = address.geometry.location;
    this.addressControl.updateValue(address.formatted_address);

    this.addresses = [];
  }

  createEvent(eventData) {
    const loading = Loading.create({
      content: 'Saving...'
    });

    this.navCtrl.present(loading);

    eventData.lat = this.position.lat();
    eventData.lng = this.position.lng();

    this.eventService
      .create(eventData)
      .toPromise()
      .then(event => {
        return setTimeout(() => loading.dismiss(), 1000);
      })
      .then(() => {
        this.close(eventData);
      });
  }

  close(newEvent) {
    this.viewCtrl.dismiss(newEvent);
  }
}