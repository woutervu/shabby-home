import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Scene } from "../models/scene";
import { Events } from "ionic-angular";
import { DeviceProvider } from "./DeviceProvider";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class SceneProvider {
  // @todo: replace with real API call.
  private initialScenes = [
    {
      "uuid": "6b7ba300-07c4-11e9-b568-0800200c9a66",
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
  constructor (private deviceProvider : DeviceProvider, public events : Events) {
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
      let newScene = new Scene(scene);
      self.scenes.push(newScene);
    });
  }

  /**
   * Return all scenes.
   * @todo: this will be an API call.
   */
  public getScenes() {
    console.log('Getting all scenes.');
    this.events.publish('scenes:update', this.scenes);
    console.log('scenes:' + this.scenes);
    return this.scenes;
  }

  /**
   * Get scene by UUID.
   * @param uuid
   */
  public getScene(uuid) {
    console.log("Getting scene: " + uuid);
    return this.scenes.find(i => i.uuid === uuid);
  }

  /**
   * Delete scene by ID.
   * @param uuid
   */
  public deleteScene(uuid) {
    console.log("Deleting scene: " + uuid);
    let index = this.scenes.findIndex(i => i.uuid === uuid);
    this.scenes.splice(index, 1);
  }

  /**
   * Activate scene.
   * @param scene
   */
  public activateScene(scene) {
    this.deviceProvider.turnOnDevices(scene.devicesOn);
    this.deviceProvider.turnOffDevices(scene.devicesOff);
  }
}
