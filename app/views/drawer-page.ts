import { DrawerOverNavigationModel } from "../models/drawer-over-navigation-model";
var permissions = require( "nativescript-permissions");

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new DrawerOverNavigationModel();

    permissions.requestPermission("android.permission.WRITE_EXTERNAL_STORAGE", "I need these permissions")
        .then(function() {
            console.log("Permissions granted!");
        })
        .catch(function() {
            console.log("Uh oh, no permissions - plan B time!");
    });
}