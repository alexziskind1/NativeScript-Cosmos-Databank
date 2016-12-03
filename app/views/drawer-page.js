"use strict";
var drawer_over_navigation_model_1 = require("../models/drawer-over-navigation-model");
var permissions = require("nativescript-permissions");
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
}
exports.onPageLoaded = onPageLoaded;
function onPageNavigatedTo(args) {
    var page = args.object;
    permissions.requestPermission([
        "android.permission.INTERNET",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.SET_WALLPAPER"
    ], "I need these permissions")
        .then(function (res) {
        console.log("Permissions granted!");
    })
        .catch(function () {
        console.log("No permissions - plan B time!");
    });
}
exports.onPageNavigatedTo = onPageNavigatedTo;
//# sourceMappingURL=drawer-page.js.map