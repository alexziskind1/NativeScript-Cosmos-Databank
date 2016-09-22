import { topmost } from "ui/frame";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";
import { StackLayout } from "ui/layouts/stack-layout";
import { Button } from "ui/button";
import { Image } from "ui/image";
import { GestureTypes, GestureEventData, SwipeGestureEventData } from "ui/gestures";
import { ScrollView } from "ui/scroll-view";
import dialogs = require("ui/dialogs");
import application = require("application");
import platformModule = require("platform");
import fileSystem = require("file-system");
import enums = require("ui/enums");
import imageSource = require("image-source");
import * as utils from 'utils/utils';

import { EventData, PropertyChangeData } from "data/observable";

import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { ApodViewModel, ApodItem } from "../../models/apod/apod-model";

var permissions = require( "nativescript-permissions");
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";
 
let apodViewModel = new ApodViewModel();
apodViewModel.set("isItemVisible", true);

let drawerViewModel = new DrawerOverNavigationModel();
let page;

let shareButtonAndroid;
let saveButtonAndroid;
let desktopButtonAndroid;

let shareButtonIOS;
let iosImage;
let currentImage: imageSource.ImageSource;

var currentSaved;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;

    if (application.android) {
        shareButtonAndroid = <Button>page.getViewById("btn-share");
        saveButtonAndroid = <Button>page.getViewById("btn-save");
        desktopButtonAndroid = <Button>page.getViewById("btn-desktop");

        permissions.requestPermission("android.permission.WRITE_EXTERNAL_STORAGE", "I need these permissions")
            .then(function() {
                console.log("Permissions granted!");
            })
            .catch(function() {
                console.log("Uh oh, no permissions - plan B time!");
        });

        shareButtonAndroid.on("tap", function (args: GestureEventData)  {
            console.log("Android share tapped!");
            SocialShare.shareImage(currentImage, "NASA APOD");
        })

        saveButtonAndroid.on("tap", function (args: GestureEventData)  {
            console.log("Android save tapped!");
            onSaveFile(currentImage);

            var options = {
                title: "Photo Downloaded!",
                message: "APOD successfully saved in Downloads!",
                okButtonText: "OK"
            };
            dialogs.alert(options).then(() => {
                console.log("APOD successfully saved in /Downloads/CosmosDB");
            });
        })

        desktopButtonAndroid.on("tap", function (args: GestureEventData) {
            console.log("Set Wallpepaer Tapped!");

            onSaveFile(currentImage);

                var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
                try {
                    console.log(currentSaved);
                    var imageToSet = imageSource.fromFile(currentSaved);
                    console.log(imageToSet);
                    console.log(imageToSet.android);
                    wallpaperManager.setBitmap(imageToSet.android);
                } catch (error) {
                    console.log(error);
                }

        })

    }

    if (application.ios) {
        shareButtonIOS = <Button>page.getViewById("btn-share-ios");
        iosImage = <Image>page.getViewById("ios-image");

        shareButtonIOS.on("tap", function (args: GestureEventData)  {
            console.log("Android share tapped!");
            SocialShare.shareImage(currentImage, "NASA APOD");
        })
    }

    page.on(GestureTypes.swipe, function (args: SwipeGestureEventData) {
        console.log("Swipe Direction: " + args.direction);
        if (args.direction === 1) {

            console.log(args.direction);
            previousDate();

        } else if (args.direction === 2) {

            console.log(args.direction);
            nextDate();
        }
    })
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;

    var pageContainer = <StackLayout>page.getViewById("pageContainer");

    apodViewModel.initDataItems();
    pageContainer.bindingContext = apodViewModel;
}

export function previousDate() {
    // add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate()-1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.set("isItemVisible", true);
    apodViewModel.initDataItems(formatDate(currentDate)); 
}

export function nextDate() {

    // add check if the date is not in the future - CHECK THIS BELOW - works one tap later
    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate > new Date()) {
        var options = {
            title: "Error!",
            message: "Showing the future is avaiable in the paid version! ;)",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Future alert dismissed!");
        });
    } else {
        currentDate.setDate(currentDate.getDate()+1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.set("isItemVisible", true);
        apodViewModel.initDataItems(formatDate(currentDate)); 
    }

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;
    
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res: imageSource.ImageSource) {
        //console.log("Image successfully loaded");
        currentImage = res;
        // apodViewModel.set("isItemVisible", true);
    }, function (error) {
        //console.log("Error loading image: " + error);
    });    
}

export function onSaveFile(res: imageSource.ImageSource) {

    var fileName = "CosmosDB" + new Date().getDate().toString() + "-" + new Date().getTime().toString() + ".jpeg";  
    var tempFilePath = fileSystem.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString());
    var cosmosFOlderPath = fileSystem.path.join(tempFilePath, "CosmosDataBank");
    var folder = fileSystem.Folder.fromPath(cosmosFOlderPath);

    var path = fileSystem.path.join(cosmosFOlderPath, fileName);
    var saved = res.saveToFile(path, enums.ImageFormat.jpeg);

    console.log(saved);
    currentSaved = path;
}

export function onIosShare() {
    
    imageSource.fromUrl(iosImage.src)
        .then(function (res: imageSource.ImageSource) {           
            SocialShare.shareImage(res);
        }, function (error) {
            //console.log("Error loading image: " + error);
    });    
}

export function onIosStackLoaded() {
    console.log("onIosImageLoaded");
    // check this

    // apodViewModel.set("isItemVisible", true);
}