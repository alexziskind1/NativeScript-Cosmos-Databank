import { EventData, Observable } from "data/observable"
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel extends Observable {

    get exampleText() {
        return "This app will be your mobile space portal!" +
            " Over 500 000 photos from Mars, Moon and the Deep Space.";
    }

    get apodDescription() {
        return "One of the most popular websites at NASA is the Astronomy Picture of the Day.";
    }

    get roversDescription() {
        return "image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars";
    }

    public toggleDrawer() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.toggleDrawerState();
    }


    public goToHome() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }
    }

    public goToRoversSelectionPage() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rovers-selection",
            animated: true
        });
    }

    public goToApod() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/apod/apod",
            animated: true
        });
    }

    public goToAbout() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/about/about",
            animated: true
        });
    }
    
}