import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // @todo: replace with real API call.
  devices = [
    {
      "id": "40cf0c30-1d98-4b5b-8814-51d112343b58",
      "name": "Desk light",
      "status": true
    },
    {
      "id": "a38641e5-ecdc-44f1-a414-1119c5a0ac78",
      "name": "Living room light",
      "status": false
    },
    {
      "id": "fe4b2538-fefb-4470-bfe7-12f93e9cbf56",
      "name": "Nightstand light",
      "status": false
    },
    {
      "id": "d716220a-3139-4b2f-9526-99d7a85cb52b",
      "name": "Kitchen light",
      "status": true
    },
    {
      "id": "cc9aab58-e563-4d64-a516-e6359831e9af",
      "name": "Garage light",
      "status": false
    }

  ];

  constructor(public navCtrl: NavController) {

  }

  /**
   * Toggle device status.
   *
   * @param uuid
   */
  toggleDeviceStatus(uuid) {
    console.log("Clicked: " + uuid);
    let index = this.devices.findIndex(i => i.id === uuid);
    this.devices[index]['status'] = !this.devices[index]['status'];
  }

}
