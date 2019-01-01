import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneProvider } from "../../providers/SceneProvider";
import { DeviceProvider } from "../../providers/DeviceProvider";
import { ToastController } from 'ionic-angular';
import {Events} from "ionic-angular";

@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html',
  providers: [SceneProvider, DeviceProvider],
})
export class ScenesPage {
  public scenes: any;

  constructor(
    public navCtrl: NavController,
    private toastCtrl : ToastController,
    private sceneProvider : SceneProvider,
    private deviceProvider : DeviceProvider,
    public events : Events,
  ) {
    events.subscribe('scenes:update', (scenes) => {
      this.scenes = scenes;
    });
    this.scenes = this.sceneProvider.getScenes();
  }

  /**
   * Click handler to activate scene.
   * @param scene
   */
  public activateScene(scene) {
    let toast = this.toastCtrl.create({
      'message': 'Activating scene "' + scene.name + '"',
      'duration': 3000,
      'position': 'middle',
    });
    toast.present();
    this.sceneProvider.activateScene(scene);
  }

  public getDevices() {
    this.deviceProvider.getDevices().forEach(function(device) {
      console.log("UUID:" + device.uuid + "(status: " + device.status + '');
    });
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
