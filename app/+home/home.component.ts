import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

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