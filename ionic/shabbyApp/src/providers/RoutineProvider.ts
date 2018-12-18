import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {Routine} from "../models/routine";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class RoutineProvider {
  // @todo: replace with real API call.
  private initialRoutines = [
    {
      "id": 1,
      "name": "Daily party mode.",
      "target_device": "a38641e5-ecdc-44f1-a414-1119c5a0ac78",
      "type": "daily",
      "time": "23:59",
      "last_run": null // 23:05 -- 23:06
    },
    {
      "id": 2,
      "name": "Troll GF",
      "target_device": "fe4b2538-fefb-4470-bfe7-12f93e9cbf56",
      "type": "single",
      "date": new Date("2018-12-12T23:30:00.01"),
      "time": "23:10",
      "last_run": null
    }
  ];
  private routines = [];

  /**
   * Instance of device subscription.
   */
  private routineSubscription;

  /**
   * DeviceProvider constructor. Sets up a device subscriber.
   */
  constructor () {
    // @todo: remove once API has been implemented.
    this.initializeRoutines(this.initialRoutines);
  }

  public subscribe() {
    console.log('Subscribing RoutineProvider.');
    this.routineSubscription = Observable.interval(5000).subscribe(x => {
      this.getRoutines();
    });
  }

  public unsubscribe() {
    console.log('Unsubscribing RoutineProvider.');
    this.routineSubscription.unsubscribe();
  }

  private initializeRoutines(initialRoutines) {
    let self = this;
    initialRoutines.forEach(function (routine) {
      self.routines.push(new Routine(routine));
    });
  }

  /**
   * Return all routines.
   * @todo: this will be an API call.
   */
  public getRoutines() {
    console.log('Checking routines.');
    return this.routines;
  }

  /**
   * Get routine by ID.
   * @param id
   */
  public getRoutine(id) {
    console.log("Getting routine: " + id);
    return this.routines.find(i => i.id === id);
  }

  /**
   * Delete routine by ID.
   * @param id
   */
  public deleteRoutine(id) {
    console.log("Deleting routine: " + id);
    let index = this.routines.findIndex(i => i.id === id);
    this.routines.splice(index, 1);
  }

  /**
   * Turn on routine by UUID.
   * @param uuid
   */
  public turnOnDevice(uuid) {
    console.log("Turning off: " + uuid);
    let index = this.routines.findIndex(i => i.id === uuid);
    this.routines[index]['status'] = true;
  }

  /**
   * Toggle routine status.
   * @param uuid
   */
  public toggleDeviceStatus(uuid) {
    console.log("Toggling: " + uuid);
    let index = this.routines.findIndex(i => i.id === uuid);
    this.routines[index]['status'] = !this.routines[index]['status'];
  }

  public turnOnAllDevices() {
    this.routines.forEach(function (routine) {
      routine['status'] = true;
    });
  }

  public turnOffAllDevices() {
    this.routines.forEach(function (routine) {
      routine['status'] = false;
    });
  }
}
