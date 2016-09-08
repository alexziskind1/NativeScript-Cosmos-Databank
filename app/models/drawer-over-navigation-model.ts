import { EventData, Observable } from "data/observable"
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel extends Observable {

    private _cachedIndex: number = 0;
    private _showCur: boolean = true;
    private _showOpp: boolean = true;
    private _showSpi: boolean = true;

    get exampleText() {
        return "This is POC app created with NativeScript and NASA API service" +
            " This app uses fresco plugin to load simuntaniously hundres of photos under Android." +
            "The NASA APIs used so far are APOD (Astronomy picture of the day) and Mars Rovers Photos API (500 000+ photos)" +
            "Please use the side-drawer to navigate.";
    }


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

    public get cachedIndex() {
        return this._cachedIndex;
    }      

    public set cachedIndex(value: number) {
        if (this._cachedIndex !== value) {
            this._cachedIndex = value;
            this.notifyPropertyChange("cachedIndex", value);
        }
    }    

    public toggleDrawer() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.toggleDrawerState();
    }

    public goToMainPage() {
        frameModule.topmost().navigate({
            moduleName: "./views/drawer-page"
        });    
    }

    public goToRoversSelectionPage() {
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rovers-selection"
        });
    }

    public goToApod() {
        frameModule.topmost().navigate({
            moduleName: "./views/apod/apod"
        });
    }

    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-cur");

        console.log("goToCuriosityPage");
        console.log("dt: " + dt);
        console.log(dt.year + " " + dt.month + " " + dt.day);

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