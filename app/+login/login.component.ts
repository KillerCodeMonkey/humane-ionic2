import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {Alert, MenuController, Modal} from 'ionic-angular';

import {AuthService} from '../shared/index';
import {Login} from '../shared/index';

import {HomeComponent} from '../+home/index';
import {RegisterModalComponent} from '../+register/index';

@Component({
  templateUrl: 'build/+login/login.component.html'
})
export class LoginComponent implements OnInit {
  form: ControlGroup;
  alertOpen = false;

  constructor(
    private menu: MenuController,
    private fb: FormBuilder,
    private authService: AuthService,
    private nav: NavController
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      isSocial: false,
      tac: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.menu.enable(false, 'left');
  }

  login(data: Login) {
    this.authService.login(data).then(() => {
      this.nav.setRoot(HomeComponent);
    });
  }

  chooseRegistration() {
    this.alertOpen = true;

    const alert = Alert.create({
      title: 'Register',
      message: 'Do you want to register as NGO?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.alertOpen = false;
            const register = Modal.create(RegisterModalComponent, {isNGO: false});

            this.nav.present(register);
            // TODO: show ordinary registration
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.alertOpen = false;
            const register = Modal.create(RegisterModalComponent, {isNGO: true});

            this.nav.present(register);
            // TODO: show NGO registration
          }
        }, {
          text: 'Cancel',
          handler: () => {
            this.alertOpen = false;
          }
        }
      ]
    });

    this.nav.present(alert);
  }
}