"use strict";
var application = require("application");
var fresco = require("nativescript-fresco");
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    persist: true,
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    onMessageReceivedCallback: function (message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        console.log(JSON.stringify(message));
        // if your server passed a custom property called 'foo', then do this:
        // console.log("Value of 'foo': " + message.favorites);
    }
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
//# sourceMappingURL=app.js.map