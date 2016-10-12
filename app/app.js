"use strict";
var application = require("application");
var fresco = require("nativescript-fresco");
if (application.android) {
    application.onLaunch = function (intent) {
        fresco.initialize();
    };
}
application.start({ moduleName: "views/drawer-page" });
// application.start({ moduleName: "views/rover-photo-page" });
//# sourceMappingURL=app.js.map