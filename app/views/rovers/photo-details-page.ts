import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";
import { topmost } from "ui/frame";
import { Image } from "ui/image";
import { GestureEventData } from "ui/gestures";
import * as application from "application";
import * as imageSource from "image-source";
import * as utils from "utils/utils";
import { firebasePush } from "../helpers/firebase/firebase";
import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";

if (application.android) {
    var toast = require("nativescript-toast");
}

import { saveFile, setButtonsOpacity, setUserInteraction, setCurrentImage } from "../helpers/files/file-helpers";

let viewModel: Observable;
let page: Page;
let shareButton: Button;
let saveButton: Button;
let desktopButton: Button;
let iosImage: Image;

let currentImage: imageSource.ImageSource;
var currentSavedPath: string;

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;

    shareButton = <Button>page.getViewById("btn-shar");
    saveButton = <Button>page.getViewById("btn-save");
    desktopButton = <Button>page.getViewById("btn-desk");

    if (application.android) {
        setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
    }

    if (application.ios) {
        iosImage = <Image>page.getViewById("ios-image");
    }

    let navContext = page.navigationContext;
    viewModel = new Observable();
    viewModel.set("contextItem", navContext["tappedItem"]);

    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;

    currentImage = setCurrentImage(drawee.imageUri);

    saveButton.animate({ opacity: 0.2, rotate: 360 })
        .then(() => { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(() => { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });

    desktopButton.animate({ opacity: 0.2, rotate: 360 })
        .then(() => { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(() => { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });

    shareButton.animate({ opacity: 0.2, rotate: 360 })
        .then(() => { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(() => { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); })
        .then(() => { setUserInteraction(shareButton, saveButton, desktopButton, true) });
}

export function onSaveImage(args: EventData) {

    firebasePush(viewModel.get("contextItem"), "save");

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                saveFile(res, viewModel.get("contextItem").imageUri, currentSavedPath);
            }).catch(err => {
                console.log(err);
            });
    } else if (application.android) {
        saveFile(currentImage, viewModel.get("contextItem").imageUri, currentSavedPath);
        toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }
}

export function onSetWallpaper(args: EventData) {

    firebasePush(viewModel.get("contextItem"), "wallpaper");

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                currentImage = res; // TODO : set wallpaper for iOS
            }).catch(err => {
                console.log(err);
            });;
    } else if (application.android) {

        saveFile(currentImage, viewModel.get("contextItem").imageUri, currentSavedPath);

        var wallpaperManager = application.android.nativeApp.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            wallpaperManager.setBitmap(currentImage.android);
        } catch (error) {
            console.log(error);
        }

        toast.makeText("Wallpaper Set!").show();
    }
}

export function onShare(args: EventData) {

    firebasePush(viewModel.get("contextItem"), "share");

    if (application.android) {
        SocialShare.shareImage(currentImage, "Mars Rovers");
    } else if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                SocialShare.shareImage(res);
            }).catch(err => {
                console.log(err);
            });
    }
}
