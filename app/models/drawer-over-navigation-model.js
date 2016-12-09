"use strict";
// tslint:disable:max-line-length
var observable_1 = require("data/observable");
var frameModule = require("ui/frame");
var application = require("application");
var DrawerOverNavigationModel = (function (_super) {
    __extends(DrawerOverNavigationModel, _super);
    function DrawerOverNavigationModel() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DrawerOverNavigationModel.prototype, "exampleText", {
        get: function () {
            return "This app will be your mobile space portal!" +
                " Over hundreds of thousands of photos from Mars the Deep Space." +
                " + Asteroids to Earth proximity checker";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerOverNavigationModel.prototype, "apodDescription", {
        get: function () {
            return "Astronomical \nPhoto \nof the Day";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerOverNavigationModel.prototype, "roversDescription", {
        get: function () {
            return "Mars Rovers\n Photos\n Databank";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerOverNavigationModel.prototype, "asteroidsDescription", {
        get: function () {
            return "Asteroids\n Proximity\n Checker";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerOverNavigationModel.prototype, "epicDescription", {
        get: function () {
            return "Earth \nPolychromatic \nImaging Camera";
        },
        enumerable: true,
        configurable: true
    });
    DrawerOverNavigationModel.prototype.toggleDrawer = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
        sideDrawer.toggleDrawerState();
    };
    DrawerOverNavigationModel.prototype.goToHome = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
        if (sideDrawer.getIsOpen()) {
            sideDrawer.closeDrawer();
        }
    };
    DrawerOverNavigationModel.prototype.goToRoversSelectionPage = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
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
    };
    DrawerOverNavigationModel.prototype.goToApod = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
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
    };
    DrawerOverNavigationModel.prototype.goToAsteroids = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
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
    };
    DrawerOverNavigationModel.prototype.goToEpic = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
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
    };
    DrawerOverNavigationModel.prototype.goToAbout = function () {
        var sideDrawer = (frameModule.topmost().getViewById("sideDrawer"));
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
    };
    return DrawerOverNavigationModel;
}(observable_1.Observable));
exports.DrawerOverNavigationModel = DrawerOverNavigationModel;
//# sourceMappingURL=drawer-over-navigation-model.js.map