import { Observable } from "data/observable";

export class PickersViewModel extends Observable {

    private _year: number;
    private _month: number;
    private _day: number;
    private _rover: string;

    constructor() {
        super();
    }    

    public get rover() {
        return this._rover;
    }

    public set rover(value: string) {
        if (this._rover !== value) {
            this._rover = value;
            this.notifyPropertyChange("rover", value);
        }
    }

    public get year() {
        return this._year;
    }

    public set year(value: number) {
        if (this._year !== value) {
            this._year = value;
            this.notifyPropertyChange("year", value);
        }
    }

    public get month() {
        return this._month;
    }

    public set month(value: number) {
        if (this._month !== value) {
            this._month = value;
            this.notifyPropertyChange("month", value); 
        }
    }

    public get day() {
        return this._day;
    }

    public set day(value: number) {
        if (this._day !== value) {
            this._day = value;
            this.notifyPropertyChange("day", value);
        }
    }



}
