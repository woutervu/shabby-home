import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-routines',
  templateUrl: 'routines.html'
})
export class RoutinesPage {
  routines = [
    {
      "name": "Daily party mode.",
      "target_device": "a38641e5-ecdc-44f1-a414-1119c5a0ac78",
      "type": "daily",
      "time": "23:59",
      "last_run": null // 23:05 -- 23:06
    },
    {
      "name": "Troll GF",
      "target_device": "fe4b2538-fefb-4470-bfe7-12f93e9cbf56",
      "type": "single",
      "date": new Date("2018-12-12T23:30:00.01"),
      "time": "23:10",
      "last_run": null
    }
  ];

  constructor(public navCtrl: NavController) {
    Observable.interval(5000).subscribe(x => {
      this.checkForRoutines();
    });
  }

  checkForRoutines() {
    // Get current date.
    let date = new Date();
    console.log('Looping routines.');
    console.log(date.getMinutes());
    // Loop through routines.
    this.routines.forEach(function (routine) {
      switch (routine.type) {
        case 'daily':
          let routineTime = routine.time.split(":");
          let dailyTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDay(), +routineTime[0], +routineTime[1], 0);
          // @todo: this always seems to pass the check. Y tho?
          if (date.getTime() >= dailyTimestamp.getTime()) {
            if (routine.last_run == null || routine.last_run.getTime() < dailyTimestamp.getTime()) {
              console.log('Running routine: ' + routine.name);
              routine.last_run = date;
            }
          }
          break;
        case 'single':

          break;
      }
    });
  }



}
