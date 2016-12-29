"use strict";
var drawer_over_navigation_model_1 = require("../view-models/drawer-over-navigation-model");
var permissions = require("nativescript-permissions");
var vm = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
function onPageLoaded(args) {
    var page = args.object;
    var currentUser = page.navigationContext;
    console.log(JSON.stringify(currentUser));
    vm.set("currentUser", currentUser);
    page.bindingContext = vm;
}
exports.onPageLoaded = onPageLoaded;
function onPageNavigatedTo(args) {
    var page = args.object;
    permissions.requestPermission([
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.SET_WALLPAPER",
        "android.permission.ACCESS_NETWORK_STATE"
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