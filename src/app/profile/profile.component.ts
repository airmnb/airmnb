import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    gender: null,
    age: {
      a23: false,
      a34: false,
      a45: false,
      a56: false
    },
    language: {
      english: true,
      chinese: true,
      japanese: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
