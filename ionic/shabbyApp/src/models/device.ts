export class Device {
    private _uuid: string;
    private _name: string;
    private _icon: string;
    private _status: boolean;

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
        this._status = newStatus;
    } 
 
    constructor(device: {}) {
        for (var setting in device) {

            // Continue loop if the key(setting) is from a prototype object (bullshit)
            if (!device.hasOwnProperty(setting)) {
                continue;
            }

            if (setting === "uuid") {
                this.uuid = device[setting];
            }
            else if (setting === "name") {
                this.name = device[setting];
            }
            else if (setting === "icon") {
                this.icon = device[setting];
            }
            else if (setting === "status" && typeof device[setting] === "boolean") {
                this.status = device[setting];
            }
        }
    }
}
