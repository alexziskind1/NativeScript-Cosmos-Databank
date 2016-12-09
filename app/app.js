"use strict";
var application = require("application");
var fresco = require("nativescript-fresco");
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    persist: true
}).then(function (instance) {
    console.log("firebase.init done");
}).catch(function (err) {
    console.log("Firebase init error: " + err);
});
if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}
application.start({ moduleName: "views/drawer-page" });
// application.start({ moduleName: "views/rover-photo-page" });
//# sourceMappingURL=app.js.map