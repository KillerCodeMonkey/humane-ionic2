import {Component, OnInit} from '@angular/core';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {NavParams} from 'ionic-angular';

const basicControls = {
  name: ['', Validators.required],
  email: ['', Validators.required],
  password: ['', Validators.required],
  passwordRepeat: ['', Validators.required],
  location: ['', Validators.required],
  tags: ['', Validators.required],
  tac: [false, Validators.required]
};

const ngoControls = Object.assign({}, basicControls, {license: ['', Validators.required]});

@Component({
  templateUrl: 'build/+register/register-model.component.html'
})
export class RegisterModalComponent implements OnInit {
  form: ControlGroup;
  isNGO = false;
  controlNames: string[];

  constructor(
    private fb: FormBuilder,
    private params: NavParams
  ) {
    this.isNGO = this.params.get('isNGO');

    this.controlNames = Object.keys(this.isNGO ? ngoControls : basicControls);
    this.controlNames.splice(this.controlNames.length - 2, 2);
    this.form = this.fb.group(this.isNGO ? ngoControls : basicControls);
  }

  ngOnInit() {

  }
}