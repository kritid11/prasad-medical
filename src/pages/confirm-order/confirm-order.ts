import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html'
})
export class ConfirmOrderPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentLatLong : string;

  constructor(public navCtrl: NavController,
              private launchNavigator: LaunchNavigator,
              private geolocation: Geolocation) {

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
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('current geolocation: ',resp);
      this.currentLatLong = resp.coords.latitude + ',' + resp.coords.longitude;
     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let options: LaunchNavigatorOptions = {

      start : this.currentLatLong,
      //start: '21.122986,79.051513',
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
