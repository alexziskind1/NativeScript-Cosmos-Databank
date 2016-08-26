import { EventData, Observable } from "data/observable"
import { Button } from "ui/button";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel extends Observable {
    get exampleText() {
        return "RadSideDrawer can be shown over the navigation bar/action bar by using DrawerPage instead of Page." +
            " DrawerPage has a sideDrawer property which accepts RadSideDrawer with just drawerContent set. The main content is the child of the page.";
    }

    public toggleDrawer() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.toggleDrawerState();
    }

    public goToMainPage() {
        console.log("goToMainPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/drawer-page"
        });    
    }

    public goToRoversSelectionPage() {

        console.log("goToRoversSelectionPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rovers-selection"
        });
    }

    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        console.log("goToRoversPhotosPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2013, "month": 8, "day": 6 }
        });
    }

    public goToOpportunityPage(args: EventData) {
        var button = <Button>args.object;
        console.log("goToRoversPhotosPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2005, "month": 8, "day": 6 }
        });
    }

    public goToSpiritPage(args: EventData) {
        var button = <Button>args.object;
        console.log("goToRoversPhotosPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": 2006, "month": 8, "day": 6 }
        });
    }
}