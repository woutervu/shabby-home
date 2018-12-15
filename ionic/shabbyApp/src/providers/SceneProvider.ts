import { Injectable } from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
/**
 * Repository to fetch and update repositories.
 */
export class SceneProvider {
  // @todo: replace with real API call.
  public scenes = [
    {
      "id": 1,
      "name": "Living room",
      "devices": ["a38641e5-ecdc-44f1-a414-1119c5a0ac78", "fe4b2538-fefb-4470-bfe7-12f93e9cbf56"],
    }
  ];

  /**
   * Instance of scene subscription.
   */
  private sceneSubscription;

  /**
   * SceneProvider constructor.
   */
  constructor () {
    //
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
}
