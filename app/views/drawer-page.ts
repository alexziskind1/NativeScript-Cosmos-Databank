import { DrawerOverNavigationModel } from "../view-models/drawer-over-navigation-model";
import { Page } from "ui/page";
var permissions = require("nativescript-permissions");

let vm = new DrawerOverNavigationModel();

export function onPageLoaded(args) {
    var page = <Page>args.object;

    var currentUser = page.navigationContext;

    console.log(JSON.stringify(currentUser));
    vm.set("currentUser", currentUser);

    page.bindingContext = vm;
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
