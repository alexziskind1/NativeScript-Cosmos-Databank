import { topmost } from "ui/frame";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";
import { StackLayout } from "ui/layouts/stack-layout";
import { Button } from "ui/button";
import { Image } from "ui/image";
import { GestureTypes, GestureEventData, SwipeGestureEventData } from "ui/gestures";
import dialogs = require("ui/dialogs");
import application = require("application");
import imageSource = require("image-source");

import { EventData, PropertyChangeData } from "data/observable";

import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { ApodViewModel, ApodItem } from "../../models/apod/apod-model";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";
 
let apodViewModel = new ApodViewModel();
apodViewModel.set("isItemVisible", false);

let drawerViewModel = new DrawerOverNavigationModel();
let page;
let shareButtonAndroid;
let shareButtonIOS;
let iosImage;
let stackParentIOS;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
    // page.bindingContext = drawerViewModel;   

	// var sideDrawer = <drawerModule.RadSideDrawer>page.getViewById("sideDrawer");
    // sideDrawer.closeDrawer();

    shareButtonAndroid = <Button>page.getViewById("btn-share");

    if (application.ios) {
        shareButtonIOS = <Button>page.getViewById("btn-share-ios");
        iosImage = <Image>page.getViewById("ios-image");
        stackParentIOS = <StackLayout>page.getViewById("st-parent-ios");
    }
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;
    var pageContainer = <GridLayout>page.getViewById("pageContainer");

    apodViewModel.initDataItems();
    pageContainer.bindingContext = apodViewModel;

    pageContainer.on(GestureTypes.swipe, function (args: SwipeGestureEventData) {
        console.log("Swipe Direction: " + args.direction);
        if (args.direction === 1) {
            previousDate();
        } else if (args.direction === 2) {
            nextDate();
        }
    })
}

export function previousDate() {
    // add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate()-1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.set("isItemVisible", false);
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
        apodViewModel.set("isItemVisible", false);
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

        apodViewModel.set("isItemVisible", true);
        
        shareButtonAndroid.on("tap", function (args: GestureEventData)  {
            console.log("Android share tapped!");
            SocialShare.shareImage(res, "NASA APOD");
        })

    }, function (error) {
        //console.log("Error loading image: " + error);
    });    
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

    apodViewModel.set("isItemVisible", true);
}