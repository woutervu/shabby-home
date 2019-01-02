import {Component, DoCheck } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {DeviceProvider} from "../../providers/DeviceProvider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeviceProvider],
})
export class HomePage implements DoCheck {
  public devices: any;
  constructor(
    public navCtrl: NavController,
    private deviceProvider : DeviceProvider,
    public events : Events,
  ) {
     events.subscribe('devices:update', (devices) => {
       this.devices = devices;
     });
  }
  /**
   * Toggle device status.
   * @param device
   */
  public toggleDeviceStatus(device) {
    device.status = !device.status;
  }

  public getDevices() {
    this.deviceProvider.getDevices().forEach(function(device) {
      console.log("UUID:" + device.uuid + "(status: " + device.status + ')');
    });
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    console.log('Home view loaded');
    this.devices = this.deviceProvider.getDevices();
    console.log(this.devices);
    this.deviceProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.deviceProvider.unsubscribe();
  }

  ngDoCheck(): void {
    console.log('Changes detected.');
    this.events.publish('devices:update', this.devices);
  }

}
