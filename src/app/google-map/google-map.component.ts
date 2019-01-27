import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  lat: Number = 37.799448;
  lng: Number = -120.979021;
  zoom: Number = 8;

  public origin: any;
  public destination: any;

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 37.799448, lng: -120.979021 }
    this.destination = { lat: 37.799524, lng: -120.975017 }
  }
}
