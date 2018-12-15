import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceProvider } from "../../providers/DeviceProvider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private devices = [];

  constructor(public navCtrl: NavController, private deviceProvider : DeviceProvider) {
    this.devices = this.deviceProvider.devices;
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
    this.deviceProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.deviceProvider.unsubscribe();
  }

}
