export class Scene {
  private _uuid: string;
  private _name: string;
  private _icon: string;
  private _devicesOn: object;
  private _devicesOff: object;

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get devicesOn(): object {
    return this._devicesOn;
  }

  set devicesOn(value: object) {
    this._devicesOn = value;
  }

  get devicesOff(): object {
    return this._devicesOff;
  }

  set devicesOff(value: object) {
    this._devicesOff = value;
  }

  constructor(scene: {}) {
    for (let setting in scene) {

      // Continue loop if the key(setting) is from a prototype object (bullshit)
      if (!scene.hasOwnProperty(setting)) {
        continue;
      }

      if (setting === "uuid") {
        this.uuid = scene[setting];
      }
      else if (setting === "name") {
        this.name = scene[setting];
      }
      else if (setting === "icon") {
        this.icon = scene[setting];
      }
      else if (setting === "devicesOn" && typeof scene[setting] === "object") {
        this.devicesOn = scene[setting];
      }
      else if (setting === "devicesOff" && typeof scene[setting] === "object") {
        this.devicesOff = scene[setting];
      }
    }
  }
}
