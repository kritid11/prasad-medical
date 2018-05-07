import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { IonicPage } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html'
})
export class ConfirmOrderPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
  private launchNavigator: LaunchNavigator) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(21.114936,79.057049);

    let mapOptions = {
      center: latLng,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Prasad Medical</h4>";

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
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
}


// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { NavController, Platform } from 'ionic-angular';
//
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   Marker,
//   GoogleMapsAnimation
// } from '@ionic-native/google-maps';
//
// //import { NewRequestPage } from '../new-request/new-request';
// import { IonicPage } from 'ionic-angular';

// @IonicPage()
// @Component({
//   selector: 'page-confirm-order',
//   templateUrl: 'confirm-order.html'
// })
// export class ConfirmOrderPage {
//
//     @ViewChild('map') mapElement: ElementRef;
//     map: GoogleMap;
//
// 	  constructor(public navCtrl: NavController,
//                 private launchNavigator: LaunchNavigator,
//                 public platform: Platform,
//                 private googleMaps:GoogleMaps) {
//
//    }
//
//    ionViewDidLoad(){
//      // Wait the native plugin is ready.
//      this.platform.ready().then(() => {
//        this.loadMap();
//      });
//
//    }
//
//
//
//     loadMap(){
//       // Create a map after the view is loaded.
//       // (platform is already ready in app.component.ts)
//       console.log('Start loading MAP');
//
//       this.map = GoogleMaps.create('map', {
//         camera: {
//           target: {
//             lat: 21.114679,
//             lng: 79.057575
//           },
//           zoom: 18,
//           tilt: 30
//         }
//       });
//
//       console.log('Map should be loaded.');
//
//       // Wait the maps plugin is ready until the MAP_READY event
//       this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
//         //this.mapReady = true;
//         console.log("map ready");
//       });
//
//       // add a marker
//         // this.map.addMarker({
//         //    title: 'Prasad Medical',
//         //    snippet: 'Prasad Medical And General Store, Pratap Nagar, Nagpur',
//         //    position: {
//         //                lat: 21.114679,
//         //                lng: 79.057575
//         //              },
//         //    animation: GoogleMapsAnimation.BOUNCE
//         //  });
//
//
//     }
//
//
//
//
//
// }
