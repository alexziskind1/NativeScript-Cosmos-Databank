import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import frameModule = require("ui/frame");

export class DrawerOverNavigationModel {
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

    public goToRoversPage() {
        console.log("goToRoversPage clicked!");
        frameModule.topmost().navigate({
            moduleName: "./views/rover-photo-page"
        });
    }
}