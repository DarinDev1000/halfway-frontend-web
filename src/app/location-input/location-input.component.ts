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
  myAddress = '5200 Lake Rd';
  myZip = '95340';
  theirAddress = '233 2nd St NW';
  theirZip = '20001';
  // rest = new RestService;

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
      // console.log(this.businessData);
      // this.rest.post(`${environment.apiURL}/submitAddress`, body);
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
    const coordinates = businessData.coordinates;
    const rating = businessData.rating;
    const location = businessData.location;
    // const displayAddress = `${location.displayAddress.}+${location.displayAddress.\1}`;
    const displayAddress = businessData.location.display_address;
    console.log(displayAddress);

    const displayAddressModified = displayAddress.replace(/\s/g, '+');
    const aliasModified = alias.replace(/-/g, '+');

    // const mapURL = `https://www.google.com/maps/search/?api=1&query=${aliasModified}&query=${coordinates.latitude},${coordinates.longitude}`;
    const mapURL = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
    // const mapURL = `https://www.google.com/maps/${displayAddress}`;
    // https://www.google.com/maps?ll=37.60822,-120.849932&z=7&t=m&hl=en-US&gl=US&mapclient=apiv3

    // const mapURL = `https://www.google.com/maps/place/${alias}/@${coordinates.latitude},${coordinates.longitude},14z`;
    console.log(mapURL);

    this.mapLink = mapURL;
    this.mapName = 'Route to Meeting Location';
  }

}
