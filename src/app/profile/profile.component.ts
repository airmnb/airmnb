import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  address = "blah blah";

  constructor() { }

  ngOnInit() {
  }

}
