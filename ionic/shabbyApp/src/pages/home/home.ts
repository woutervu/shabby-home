import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceProvider } from "../../providers/DeviceProvider";
import { Events } from "ionic-angular";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeviceProvider],
})
export class HomePage {
  private deviceForm : FormGroup;
  public devices = [];

  constructor(
    public navCtrl: NavController,
    private deviceProvider : DeviceProvider,
    public events : Events,
    private fb: FormBuilder
  ) {
     events.subscribe('devices:update', (devices) => {
       console.log(devices);
       this.devices = devices;
       console.log('Updating devices.');
     });
  }

  // @todo: WIP, might need it for proper model binding.
  ngOnInit() {
    this.deviceForm = new FormGroup({
      name: new FormControl(),
      icon: new FormControl(),
      status: new FormControl(),
    });
    console.log(this.deviceForm);
  }

  /**
   * Toggle device status.
   *
   * @param uuid
   */
  toggleDeviceStatus(uuid) {
    console.log('Toggle device ' + uuid);
    this.deviceProvider.toggleDeviceStatus(uuid);
  }

  /**
   * Subscribe to the provider before enter.
   */
  ionViewWillEnter() {
    console.log('Home view loaded');
    this.devices = this.deviceProvider.devices;
    this.deviceProvider.subscribe();
  }

  /**
   * Unsubscribe to the provider on enter.
   */
  ionViewWillLeave() {
    this.deviceProvider.unsubscribe();
  }

}
