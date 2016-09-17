import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";
import { topmost } from "ui/frame";
import { GestureTypes, GestureEventData } from "ui/gestures";

import imageSource = require("image-source");
import application = require("application");

import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";

let viewModel;
var shareButtonAndroid;

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

    if (application.android) {
        shareButtonAndroid = <Button>page.getViewById("btn-share");
    }

    var navContext = page.navigationContext;
    viewModel = new DrawerOverNavigationModel();
    viewModel.set("contextItem", navContext["tappedItem"]);
    viewModel.set("isItemVisible", false);

    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;
    
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res: imageSource.ImageSource) {
        //console.log("Image successfully loaded");

        viewModel.set("isItemVisible", true);
        
        shareButtonAndroid.on("tap", function (args: GestureEventData)  {
            console.log("Android share tapped!");
            SocialShare.shareImage(res, "Mars Rovers - Cosmos DataBank mobile App");
        })

    }, function (error) {
        //console.log("Error loading image: " + error);
    });    
}