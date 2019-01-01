export class Device {
  private _uuid: string;
  private _name: string;
  private _icon: string;
  private _status: boolean;
  constructor(device: {}) {
    for (let setting in device) {
      // Continue loop if the key(setting) is from a prototype object (bullshit)
      if (!device.hasOwnProperty(setting)) {
        continue;
      }

      if (setting === "uuid") {
        this._uuid = device[setting];
      }
      else if (setting === "name") {
        this._name = device[setting];
      }
      else if (setting === "icon") {
        this._icon = device[setting];
      }
      else if (setting === "status" && typeof device[setting] === "boolean") {
        this._status = device[setting];
      }
    }
  }

  get uuid(): string {
      return this._uuid;
  }

  set uuid(newUuid: string) {
      this._uuid = newUuid;
  }

  get name(): string {
      return this._name;
  }

  set name(newName: string) {
      this._name = newName;
  }

  get icon(): string {
      return this._icon;
  }

  set icon(newIcon: string) {
      this._icon = newIcon;
  }

  get status(): boolean {
      return this._status;
  }

  set status(newStatus: boolean) {
      console.log('Setting status.');
      this._status = newStatus;
  }
}
