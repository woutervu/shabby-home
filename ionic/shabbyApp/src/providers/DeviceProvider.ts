import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Events } from "ionic-angular";
import { Device } from "../models/device";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class DeviceProvider {
  // @todo: replace with real API call.
  private initialDevices = [
    {
      "uuid": "40cf0c30-1d98-4b5b-8814-51d112343b58",
      "name": "Desk light",
      "icon": "bulb",
      "status": true
    },
    {
      "uuid": "a38641e5-ecdc-44f1-a414-1119c5a0ac78",
      "name": "Living room light",
      "icon": "bulb",
      "status": false
    },
    {
      "uuid": "fe4b2538-fefb-4470-bfe7-12f93e9cbf56",
      "name": "Nightstand light",
      "icon": "bulb",
      "status": false
    },
    {
      "uuid": "d716220a-3139-4b2f-9526-99d7a85cb52b",
      "name": "Watercooker",
      "icon": "outlet",
      "status": true
    },
    {
      "uuid": "cc9aab58-e563-4d64-a516-e6359831e9af",
      "name": "Coffee machine",
      "icon": "outlet",
      "status": false
    }
  ];
  private devices = [];

  /**
   * Instance of device subscription.
   */
  private deviceSubscription;

  /**
   * DeviceProvider constructor. Sets up a device subscriber.
   */
  constructor (public events : Events) {
    this.initializeDevices(this.initialDevices);
    events.subscribe('devices:update', (devices) => {
      this.updateDevices(devices);
    });
  }

  public subscribe() {
    this.deviceSubscription = Observable.interval(5000).subscribe(x => {
      this.getDevices();
    });
  }

  public unsubscribe() {
    this.deviceSubscription.unsubscribe();
  }

  private initializeDevices(initialDevices) {
    let self = this;
    initialDevices.forEach(function (device) {
      let newDevice = new Device(device);
      self.devices.push(newDevice);
    });
  }

  /**
   * Get all devices.
   * @todo: this will be an API call.
   */
  public getDevices() {
    this.events.publish('devices:update', this.devices);
    return this.devices;
  }

  /**
   * Get device by UUID.
   * @param uuid
   */
  public getDevice(uuid) {
    console.log("Getting device: " + uuid);
    return this.devices.find(i => i.uuid === uuid);
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

  public turnOffDevices(devices) {
    console.log('Turning off devices.');
    console.log(devices);
    for (let device of devices) {
      device.status(false);
    }
  }

  /**
   * Turn on device by UUID.
   * @param uuid
   */
  public turnOnDevice(uuid) {
    console.log("Turning on: " + uuid);
    let index = this.devices.findIndex(i => i.id === uuid);
    this.devices[index]['status'] = true;
  }

  /**
   * Turn on devices by array with UUIDs.
   * @param uuids
   */
  public turnOnDevices(devices) {
    console.log('Turning on devices.');
    console.log(devices);
    for (let device of devices) {
      device.status(true);
    }
  }

  /**
   * Toggle device status.
   * @param device
   */
  public toggleDeviceStatus(device) {
    console.log("Toggling: " + device);
    device.status(!device.status);
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

  public updateDevices(devices) {
    let self = this;
    devices.forEach(function(device) {
      let localDevice = self.devices.filter(localDevice => localDevice.uuid === device.uuid);
      if (localDevice !== device) {
        console.log('Device changed.');
        console.log(localDevice);
        console.log(device);
      }
    });
  }
}
