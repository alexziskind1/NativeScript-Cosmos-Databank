import application = require("application");
import fresco = require("nativescript-fresco");

setTimeout(function() {
    console.log("background timeout to remove");
}, 2000);

if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}

application.start({ moduleName: "views/drawer-page" });
// application.start({ moduleName: "views/rover-photo-page" });
