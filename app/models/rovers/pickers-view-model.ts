import { Observable, EventData } from "data/observable";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import * as frameModule from "ui/frame"; 
import * as application from "application";

export class PickersViewModel extends Observable {

    private _year: number;
    private _month: number;
    private _day: number;

    private _yearOpp: number;
    private _monthOpp: number;
    private _dayOpp: number;

    private _yearSpi: number;
    private _monthSpi: number;
    private _daySpi: number;

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

    public get yearOpp() {
        return this._yearOpp;
    }

    public set yearOpp(value: number) {
        if (this._yearOpp !== value) {
            this._yearOpp = value;
            this.notifyPropertyChange("yearOpp", value);
        }
    }

    public get monthOpp() {
        return this._monthOpp;
    }

    public set monthOpp(value: number) {
        if (this._monthOpp !== value) {
            this._monthOpp = value;
            this.notifyPropertyChange("monthOpp", value); 
        }
    }

    public get dayOpp() {
        return this._dayOpp;
    }

    public set dayOpp(value: number) {
        if (this._dayOpp !== value) {
            this._dayOpp = value;
            this.notifyPropertyChange("dayOpp", value);
        }
    }

    public get yearSpi() {
        return this._yearSpi;
    }

    public set yearSpi(value: number) {
        if (this._yearSpi !== value) {
            this._yearSpi = value;
            this.notifyPropertyChange("yearSpi", value);
        }
    }

    public get monthSpi() {
        return this._monthSpi;
    }

    public set monthSpi(value: number) {
        if (this._monthSpi !== value) {
            this._monthSpi = value;
            this.notifyPropertyChange("monthSpi", value); 
        }
    }

    public get daySpi() {
        return this._daySpi;
    }

    public set daySpi(value: number) {
        if (this._daySpi !== value) {
            this._daySpi = value;
            this.notifyPropertyChange("daySpi", value);
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

    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-cur");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "curiosity", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToOpportunityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-opp");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "opportunity", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToSpiritPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-spi");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "spirit", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }
}
