import application = require("application");
import fresco = require("nativescript-fresco");

if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}

application.start({ moduleName: "main-page" });
