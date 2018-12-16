import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneProvider } from "../../providers/SceneProvider";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html'
})
export class ScenesPage {
  public scenes;

  constructor(public navCtrl: NavController, private toastCtrl : ToastController , private sceneProvider : SceneProvider) {
    this.scenes = this.sceneProvider.scenes;
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
    this.sceneProvider.activateScene(scene.id);
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
