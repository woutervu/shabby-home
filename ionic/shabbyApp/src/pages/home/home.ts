import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceProvider } from "../../providers/DeviceProvider";
import { Events } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public devices = [];

  constructor(public navCtrl: NavController, private deviceProvider : DeviceProvider, public events : Events) {
     events.subscribe('devices:update', (devices) => {
       console.log(devices);
       this.devices = devices;
       console.log('Updating devices.');
     });
  }

  /**
   * Toggle device status.
   *
   * @param uuid
   */
  toggleDeviceStatus(uuid) {
    this.deviceProvider.toggleDeviceStatus(uuid);
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    console.log('Home view loaded');
    this.devices = this.deviceProvider.getDevices();
    this.deviceProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.deviceProvider.unsubscribe();
  }

}
