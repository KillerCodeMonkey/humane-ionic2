import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/+home/home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private menu: MenuController,
    private nav: NavController
  ) {
  }

  ngOnInit() {
    this.menu.enable(true, 'left');
  }
}