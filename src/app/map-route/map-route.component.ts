import { Component, OnInit } from '@angular/core';

import '../../shared/display.map';

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.scss']
})
export class MapRouteComponent implements OnInit {

  constructor() { }

  public lat: Number = 37.799448;
  public lng: Number = -120.979021;

  public origin: any;
  public destination: any;

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }

  // this.origin = 'Taipei Main Station'
  // this.destination = 'Taiwan Presidential Office'
}
  // ngOnInit() {
  //   // var map;
  //   // function initMap() {
  //   //   map = new google.maps.Map(document.getElementById('map'), {
  //   //     center: {lat: -34.397, lng: 150.644},
  //   //     zoom: 8
  //   //   });
  //   // }
  // }

}
