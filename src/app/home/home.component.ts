import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { MapServiceService } from '../map-service.service';

@Component({
  selector: 'amb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public submitted = false;
  public model = {
    location: '',
    age: -1,
    gender: -1,
    date: new Date(),
    timeFrom: {
      hour: 0,
      minute: 0
    },
    timeTo: {
      hour: 0,
      minute: 0
    },
  };
  constructor(private sessionService: SessionService, private router: Router, private mapService: MapServiceService) { }

  ngOnInit(){
    // Get the current geolocation
    if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => this.model.location = x)
      .catch(e => this.model.location = null);
  }

  async onSubmit() {
    this.submitted = true;
    try{

      this.router.navigateByUrl('consumer');
    }catch (e){
      console.log(e);
      this.submitted = false;
    }
  }
}
