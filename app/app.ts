import application = require("application");
import fresco = require("nativescript-fresco");
import firebase = require("nativescript-plugin-firebase");

firebase.init({
    persist: true
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(instance => {
    console.log("firebase.init done");
}).catch(err => {
    console.log("Firebase init error: " + err);
});


if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}

application.start({ moduleName: "views/drawer-page" });
// application.start({ moduleName: "views/rover-photo-page" });
