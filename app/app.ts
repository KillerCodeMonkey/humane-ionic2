import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {LoginComponent} from './+login/login.component';
import {EventsComponent} from './+events/events.component';

import {AuthService, EventService, User} from './shared/index';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string}>

  constructor(private platform: Platform, auth: AuthService) {
    const currentUser = auth.getLogin();

    if (currentUser && currentUser.email) {
      this.rootPage = EventsComponent;
    } else {
      this.rootPage = LoginComponent;
    }

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started' },
      { title: 'List' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [AuthService, EventService]);
