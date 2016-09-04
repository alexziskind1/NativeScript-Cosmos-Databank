import { EventData, Observable } from "data/observable"
import { Button } from "ui/button";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel extends Observable {

    private _cachedIndex: number = 0;
    private _showCur: boolean = true;
    private _showOpp: boolean = true;
    private _showSpi: boolean = true;

    get exampleText() {
        return "RadSideDrawer can be shown over the navigation bar/action bar by using DrawerPage instead of Page." +
            " DrawerPage has a sideDrawer property which accepts RadSideDrawer with just drawerContent set. The main content is the child of the page.";
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

    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2015, "month": 2, "day": 12 }
        });
    }

    public goToOpportunityPage(args: EventData) {
        var button = <Button>args.object;
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2008, "month": 5, "day": 15 }
        });
    }

    public goToSpiritPage(args: EventData) {
        var button = <Button>args.object;
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2007, "month": 11, "day": 21 }
        });
    }
}