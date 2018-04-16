import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

//import { NewRequestPage } from '../new-request/new-request';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html'
})
export class ConfirmOrderPage {

    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;

	  constructor(public navCtrl: NavController,
                private launchNavigator: LaunchNavigator,
                public platform: Platform) {
                  // Wait the native plugin is ready.
                  this.platform.ready().then(() => {
                    this.loadMap();
                  });
   }

    goToGoogleMaps(){
      let options: LaunchNavigatorOptions = {

        start: '21.122986,79.051513',
        //app: LaunchNavigator.APP.GOOGLE_MAPS,
        destinationName: 'Prasad Medical & General Store'
      };

      this.launchNavigator.navigate('21.114679,79.057575', options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    }

    goToNewRequestPage(){
      this.navCtrl.setRoot('NewRequestPage');
    }

    ionViewDidLoad(){
      //this.loadMap();
    }

    loadMap(){
      // Create a map after the view is loaded.
      // (platform is already ready in app.component.ts)
      this.map = GoogleMaps.create('map', {
        camera: {
          target: {
            lat: 21.114679,
            lng: 79.057575
          },
          zoom: 18,
          tilt: 30
        }
      });

      // Wait the maps plugin is ready until the MAP_READY event
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        //this.mapReady = true;
        console.log("map ready");
      });

      // add a marker
        // this.map.addMarker({
        //    title: 'Prasad Medical',
        //    snippet: 'Prasad Medical And General Store, Pratap Nagar, Nagpur',
        //    position: {
        //                lat: 21.114679,
        //                lng: 79.057575
        //              },
        //    animation: GoogleMapsAnimation.BOUNCE
        //  });

    }

}
