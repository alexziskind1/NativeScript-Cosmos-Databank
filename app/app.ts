import application = require("application");
import * as fresco from "nativescript-fresco";
import * as firebase from "nativescript-plugin-firebase";
import * as appSettings from "application-settings";
import "./bundle-config";

firebase.init({
    persist: true,
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            appSettings.setBoolean("isLogged", true);
        } else {
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

// application.start({ moduleName: "views/drawer-page" });
application.start({ moduleName: "views/login/login" });
