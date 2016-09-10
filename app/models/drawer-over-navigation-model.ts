import { EventData, Observable } from "data/observable"
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel extends Observable {

    private _cachedIndex: number = 0;

    get exampleText() {
        return "This is POC app created with NativeScript and NASA API service" +
            " This app uses fresco plugin to load simuntaniously hundres of photos under Android." +
            "The NASA APIs used so far are APOD (Astronomy picture of the day) and Mars Rovers Photos API (500 000+ photos)" +
            "Please use the side-drawer to navigate.";
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
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.closeDrawer();

        frameModule.topmost().navigate({
            moduleName: "./views/drawer-page",
            animated: false,
            backstackVisible: false
        });    
    }

    public goToRoversSelectionPage() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.closeDrawer();

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rovers-selection",
            animated: false,
            backstackVisible: false
        });
    }

    public goToApod() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.closeDrawer();

        frameModule.topmost().navigate({
            moduleName: "./views/apod/apod",
            animated: false,
            backstackVisible: false
        });
    }
}