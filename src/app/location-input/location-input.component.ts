import { Component, OnInit } from '@angular/core';

import { RestService } from "../../services/rest.service";
import axios from "axios";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {
  myAddress = '3401 Dale Rd Suite 483';
  myZip = '95356';
  theirAddress = '5755 Sisk Rd';
  theirZip = '95356';
  // rest = new RestService;

  lat: Number = 37.799448;
  lng: Number = -120.979021;
  zoom: Number = 8;

  public origin: any;
  public destination: any;


  coffee = false;
  restaurant = false;
  fastFood = false;
  entertainment = false;
  parks = false;

  businessData = {};

  mapLink = '#';
  mapName = '';

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 37.799448, lng: -120.979021 };
    this.destination = { lat: 37.799524, lng: -120.975017 };
  }

  submitAddress() {
    if ( this.myAddress && this.myZip && this.theirAddress && this.theirZip ) {

      let categories = [];
      if (this.coffee) { categories.push('coffee'); }
      if (this.restaurant) { categories.push('restaurant'); }
      if (this.fastFood) { categories.push('fastFood'); }
      if (this.entertainment) { categories.push('entertainment'); }
      if (this.parks) { categories.push('parks'); }

      const body = {
        myAddress: this.myAddress,
        myZip: this.myZip,
        theirAddress: this.theirAddress,
        theirZip: this.theirZip,
        categories: categories
      };
      console.log(body);
      this.businessData = axios.post(`${environment.apiURL}/getGeographicCenter`, body)
        .then( (res) => { 
          console.log(res.data);
          this.generateMapLink(res.data);
        } );
      // console.log(this.businessData);
      // this.rest.post(`${environment.apiURL}/submitAddress`, body);
    }
  }

  generateMapLink(businessData) {
    console.log('works');
    const alias = businessData.alias;
    const name = businessData.name;
    const coordinates = businessData.coordinates;
    const rating = businessData.rating;

    const googlePlace = axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDTR1tSdwSPeBMEPc_pmhDvTyzNstDly8g`)
      .then((googlePlace) => {
        console.log(googlePlace);
        this.displayMapLink(googlePlace, businessData);
      } );
  }

  displayMapLink(googlePlace, businessData) {
    const alias = businessData.alias;
    const name = businessData.name;
    const coordinates = businessData.coordinates;
    const rating = businessData.rating;

    const regex = /-/g;
    const aliasModified = alias.replace(regex, '+');

    const mapURL = `https://www.google.com/maps/search/?api=1&query=${aliasModified}&query=${coordinates.latitude},${coordinates.longitude}`;

    // const mapURL = `https://www.google.com/maps/place/${alias}/@${coordinates.latitude},${coordinates.longitude},14z`;
    console.log(mapURL);

    this.mapLink = mapURL;
    this.mapName = 'Route to Meeting Location';
  }

}
