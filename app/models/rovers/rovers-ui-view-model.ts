import { Observable, EventData } from "data/observable";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import * as frameModule from "ui/frame"; 

export class UiViewModel extends Observable {

    private _showCur: boolean = true;
    private _showOpp: boolean = true;
    private _showSpi: boolean = true;

    public get showCur() {
        return this._showCur;
    }   
   
    public set showCur(value: boolean) {
        if (this._showCur !== value) {
            this._showCur = value;
            this.notifyPropertyChange("showCur", value);
        }
    } 

    public get showOpp() {
        return this._showOpp;
    }   

    public set showOpp(value: boolean) {
        if (this._showOpp !== value) {
            this._showOpp = value;
            this.notifyPropertyChange("showOpp", value);
        }
    } 

    public get showSpi() {
        return this._showSpi;
    }   

    public set showSpi(value: boolean) {
        if (this._showSpi !== value) {
            this._showSpi = value;
            this.notifyPropertyChange("showSpi", value);
        }
    } 
    
    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-cur");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }

    public goToOpportunityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-opp");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }

    public goToSpiritPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-spi");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }
}