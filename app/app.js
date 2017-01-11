"use strict";
var application = require("application");
var fresco = require("nativescript-fresco");
var firebase = require("nativescript-plugin-firebase");
var appSettings = require("application-settings");
firebase.init({
    persist: true,
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    onAuthStateChanged: function (data) {
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            appSettings.setBoolean("isLogged", true);
        }
        else {
            appSettings.setBoolean("isLogged", false);
        }
    },
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
// application.start({ moduleName: "views/drawer-page" });
application.start({ moduleName: "views/login/login" });
//# sourceMappingURL=app.js.map