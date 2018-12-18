import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoutineProvider } from "../../providers/RoutineProvider";

@Component({
  selector: 'page-routines',
  templateUrl: 'routines.html'
})
export class RoutinesPage {
  public routines;

  constructor(public navCtrl: NavController, private routineProvider : RoutineProvider) {
    //
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    this.routines = this.routineProvider.getRoutines();
    this.routineProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.routineProvider.unsubscribe();
  }

}
