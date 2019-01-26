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

  coffee = false;
  restaurant = false;
  fastFood = false;
  entertainment = false;
  parks = false;


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
      axios.post(`${environment.apiURL}/getGeographicCenter`, body);
      console.log("sent");
      // this.rest.post(`${environment.apiURL}/submitAddress`, body);
    }
  }

}
