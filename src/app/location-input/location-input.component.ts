import { Component, OnInit } from '@angular/core';

import { RestService } from "../../services/rest.service";
import axios from "axios";
import { environment } from '../../environments/environment';
import { coreDirectives } from '@agm/core/core.module';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {
  myAddress = '4701 Stoddard Rd';
  myZip = '95356';
  theirAddress = '18405 Mt Hamilton Rd';
  theirZip = '95140';
  // rest = new RestService;
  show = false;

  lat: Number = 37.799448;
  lng: Number = -120.979021;
  zoom: Number = 8;

  public origin: any;
  public destination: any;

  meetingLocationName;

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
    // this.getDirection();
  }

  getDirection(origin, destination) {
    // this.origin = { lat: 37.799448, lng: -120.979021 };
    // this.destination = { lat: 37.799524, lng: -120.975017 };
    this.origin = origin;
    this.destination = destination;
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
      this.businessData = axios.post(`${environment.apiURL}/getRouteCenter`, body)
        .then( (res) => { 
          console.log(res.data);
          this.displayMapLink(res.data);
        } );

        // axios.post(`${environment.apiURL}/submitAddress`, { address: this.myAddress } )
        // .then( (res) => { console.log("responste", res.data) });

      // console.log(this.businessData);
       axios.post(`${environment.apiURL}/submitAddress`, { address: this.myAddress })
        .then( (origin) => {
          this.origin  = origin.data;
          console.log('orig', origin.data);
          axios.post(`${environment.apiURL}/submitAddress`, { address: this.theirAddress })
            .then( (destination) => {
              console.log('dest', destination.data);
              this.destination = destination.data;
              console.log(this.origin.data, this.destination.data);

              // Set map route
              // this.getDirection(this.origin, this.destination)
              // this.show = true;
            });
        });
    }
  }

  // generateMapLink(businessData) {
  //   console.log('works');
  //   const alias = businessData.alias;
  //   const name = businessData.name;
  //   const coordinates = businessData.coordinates;
  //   const rating = businessData.rating;

  //   axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDTR1tSdwSPeBMEPc_pmhDvTyzNstDly8g`)
  //     .then((googlePlace) => {
  //       console.log(googlePlace);
  //       this.displayMapLink(googlePlace, businessData);
  //     } );
  // }

  displayMapLink(businessData) {
    const alias = businessData.alias;
    const name = businessData.name;
    this.meetingLocationName = name;
    const coordinates = businessData.coordinates;
    const rating = businessData.rating;
    const location = businessData.location;
    // const displayAddress = `${location.displayAddress.}+${location.displayAddress.\1}`;
    const displayAddress = businessData.location.display_address;
    console.log(displayAddress);

    // Set map marker to business
    console.log(coordinates);
    this.lat = coordinates.latitude;
    this.lng = coordinates.longitude;

    // const displayAddressModified = displayAddress.replace(/\s/g, '+');
    const aliasModified = alias.replace(/-/g, '+');

    // const mapURL = `https://www.google.com/maps/search/?api=1&query=${aliasModified}&query=${coordinates.latitude},${coordinates.longitude}`;
    const mapURL = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
    // const mapURL = `https://www.google.com/maps/${displayAddress}`;
    // https://www.google.com/maps?ll=37.60822,-120.849932&z=7&t=m&hl=en-US&gl=US&mapclient=apiv3

    // const mapURL = `https://www.google.com/maps/place/${alias}/@${coordinates.latitude},${coordinates.longitude},14z`;
    console.log(mapURL);

    this.mapLink = mapURL;
    this.mapName = 'Route to Meeting Location';

    this.show = true;

  }

}
