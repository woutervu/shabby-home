import { Injectable } from "@angular/core";
import { Observable} from "rxjs";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class DeviceProvider {
  // @todo: replace with real API call.
  public devices = [
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

  /**
   * Instance of device subscription.
   */
  private deviceSubscription;

  /**
   * DeviceProvider constructor. Sets up a device subscriber.
   */
  constructor () {
    //
  }

  public subscribe() {
    console.log('Subscribing DeviceProvider.');
    this.deviceSubscription = Observable.interval(5000).subscribe(x => {
      this.getDevices();
    });
  }

  public unsubscribe() {
    console.log('Unsubscribing DeviceProvider.');
    this.deviceSubscription.unsubscribe();
  }

  /**
   * Get all devices.
   * @todo: this will be an API call.
   */
  public getDevices() {
    console.log('Getting devices.');
    return this.devices;
  }

  /**
   * Get device by UUID.
   * @param uuid
   */
  public getDevice(uuid) {
    console.log("Getting device: " + uuid);
    return this.devices.find(i => i.id === uuid);
  }

  /**
   * Get device status by UUID.
   * @param uuid
   */
  public getDeviceStatus(uuid) {
    console.log("Getting device status: " + uuid);
    let device = this.devices.find(i => i.id === uuid);
    return device['status'];
  }

  /**
   * Turn off device by UUID.
   * @param uuid
   */
  public turnOffDevice(uuid) {
    console.log("Turning off: " + uuid);
    let index = this.devices.findIndex(i => i.id === uuid);
    this.devices[index]['status'] = false;
  }

  /**
   * Turn on device by UUID.
   * @param uuid
   */
  public turnOnDevice(uuid) {
    console.log("Turning off: " + uuid);
    let index = this.devices.findIndex(i => i.id === uuid);
    this.devices[index]['status'] = true;
  }

  /**
   * Toggle device status.
   * @param uuid
   */
  public toggleDeviceStatus(uuid) {
    console.log("Toggling: " + uuid);
    let index = this.devices.findIndex(i => i.id === uuid);
    this.devices[index]['status'] = !this.devices[index]['status'];
  }

  public turnOnAllDevices() {
    this.devices.forEach(function (device) {
      device['status'] = true;
    });
  }

  public turnOffAllDevices() {
    this.devices.forEach(function (device) {
      device['status'] = false;
    });
  }


}
