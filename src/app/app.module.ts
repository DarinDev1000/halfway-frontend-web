import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { MapRouteComponent } from './map-route/map-route.component';
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction'   // agm-direction

@NgModule({
  declarations: [
    AppComponent,
    LocationInputComponent,
    MapRouteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDTR1tSdwSPeBMEPc_pmhDvTyzNstDly8g',
    }),
    AgmDirectionModule,     // agm-direction
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
