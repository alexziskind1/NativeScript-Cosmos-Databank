// tslint:disable:max-line-length
import { EventData, Observable } from "data/observable";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import * as drawerModule from "nativescript-telerik-ui/sidedrawer";
import * as frameModule from "ui/frame";

import * as firebase from "nativescript-plugin-firebase";
import * as application from "application";

export class DrawerOverNavigationModel extends Observable {

    get exampleText() {
        return "This app will be your mobile space portal!" +
            " Over hundreds of thousands of photos from Mars the Deep Space." +
            " + Asteroids to Earth proximity checker";
    }

    get apodDescription() {
        return "Astronomical \nPhoto \nof the Day";
    }

    get roversDescription() {
        return "Mars Rovers\n Photos\n Databank";
    }

    get asteroidsDescription() {
        return "Asteroids\n Proximity\n Checker";
    }

    get epicDescription() {
        return "Earth \nPolychromatic \nImaging Camera";
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
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToApod() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/apod/apod",
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToAsteroids() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/asteroid/asteroid",
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToEpic() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/epic/epic",
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public goToAbout() {
        var sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }

        frameModule.topmost().navigate({
            moduleName: "./views/about/about",
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    }

    public onLogout() {
        firebase.logout().then(() => {
            frameModule.topmost().navigate({
                moduleName: "./views/login/login",
            }) 
        })
    }
}
