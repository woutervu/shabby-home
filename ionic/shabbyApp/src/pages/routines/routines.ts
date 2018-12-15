import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoutineProvider } from "../../providers/RoutineProvider";

@Component({
  selector: 'page-routines',
  templateUrl: 'routines.html'
})
export class RoutinesPage {
  private routines;

  constructor(public navCtrl: NavController, private routineProvider : RoutineProvider) {
    this.routines = this.routineProvider;
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    this.routineProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.routineProvider.unsubscribe();
  }

}
