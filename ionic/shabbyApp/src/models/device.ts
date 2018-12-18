export class Device {
 
    constructor(public device: any) {
      let self = this;
      Object.keys(device).forEach(function (value, key) {
        // @todo: WIP find the value by the object key. #HACKERMAN
        self[key] = value;
      });
    }
}
