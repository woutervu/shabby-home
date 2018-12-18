import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeviceProvider } from "./DeviceProvider";
import {Device} from "../models/device";
import {Scene} from "../models/scene";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class SceneProvider {
  // @todo: replace with real API call.
  private initialScenes = [
    {
      "id": 1,
      "name": "Going to bed",
      "icon": "moon",
      "devicesOn": [
        "fe4b2538-fefb-4470-bfe7-12f93e9cbf56"
      ],
      "devicesOff": [
        "40cf0c30-1d98-4b5b-8814-51d112343b58",
        "a38641e5-ecdc-44f1-a414-1119c5a0ac78",
        "d716220a-3139-4b2f-9526-99d7a85cb52b",
        "cc9aab58-e563-4d64-a516-e6359831e9af",
      ],
    }
  ];

  private scenes = [];

  /**
   * Instance of scene subscription.
   */
  private sceneSubscription;

  /**
   * SceneProvider constructor.
   */
  constructor (private deviceProvider : DeviceProvider) {
    this.initializeScenes(this.initialScenes);
  }

  public subscribe() {
    console.log('Subscribing SceneProvider.');
    this.sceneSubscription = Observable.interval(5000).subscribe(x => {
      this.getScenes();
    });
  }

  public unsubscribe() {
    console.log('Unsubscribing SceneProvider.');
    this.sceneSubscription.unsubscribe();
  }

  private initializeScenes(initialScenes) {
    let self = this;
    initialScenes.forEach(function (scene) {
      self.scenes.push(new Scene(scene));
    });
  }

  /**
   * Return all scenes.
   * @todo: this will be an API call.
   */
  public getScenes() {
    console.log('Getting all scenes.');
    return this.scenes;
  }

  /**
   * Get scene by ID.
   * @param id
   */
  public getScene(id) {
    console.log("Getting scene: " + id);
    return this.scenes.find(i => i.id === id);
  }

  /**
   * Delete scene by ID.
   * @param id
   */
  public deleteScene(id) {
    console.log("Deleting scene: " + id);
    let index = this.scenes.findIndex(i => i.id === id);
    this.scenes.splice(index, 1);
  }

  /**
   * Activate scene.
   * @param id
   */
  public activateScene(id) {
    console.log("Activating scene: " + id);
    let scene = this.scenes.find(i => i.id === id);
    this.deviceProvider.turnOnDevices(scene.devicesOn);
    this.deviceProvider.turnOffDevices(scene.devicesOff);
    console.log('Devices (get):');
    console.log(this.deviceProvider.getDevices());
    console.log('Devices (var):');
    console.log(this.deviceProvider.getDevices());
  }
}
