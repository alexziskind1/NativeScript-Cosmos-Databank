import { DrawerOverNavigationModel } from "../models/drawer-over-navigation-model";
var permissions = require("nativescript-permissions");

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new DrawerOverNavigationModel();
}

export function onPageNavigatedTo(args) {
    let page = args.object;

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
