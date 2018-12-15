import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneProvider } from "../../providers/SceneProvider";

@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html'
})
export class ScenesPage {
  private scenes;

  constructor(public navCtrl: NavController, private sceneProvider : SceneProvider) {
    this.scenes = this.sceneProvider.scenes;
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    this.sceneProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.sceneProvider.unsubscribe();
  }

}
