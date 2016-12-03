import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";
import { topmost } from "ui/frame";
import { Image } from "ui/image";
import { GestureTypes, GestureEventData } from "ui/gestures";
import * as utils from "utils/utils";
import enums = require("ui/enums");
import fileSystem = require("file-system");
import imageSource = require("image-source");
import application = require("application");

import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";

if (application.android) {
    var toast = require("nativescript-toast");
}

let viewModel;
var shareButtonAndroid;

let page: Page;
let shareButton: Button;
let saveButton: Button;
let desktopButton: Button;

let iosImage: Image;
let currentImage: imageSource.ImageSource;

var currentSavedPath: string;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;

    shareButton = <Button>page.getViewById("btn-shar");
    saveButton = <Button>page.getViewById("btn-save");
    desktopButton = <Button>page.getViewById("btn-desk");

    if (application.ios) {
        iosImage = <Image>page.getViewById("ios-image");
    }

    let navContext = page.navigationContext;
    viewModel = new Observable();
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
        .then(res => {
            currentImage = res;
            viewModel.set("isItemVisible", true);

            shareButton.on("tap", function (args: GestureEventData) {
                console.log("Android share tapped!");
                SocialShare.shareImage(res, "Mars Rovers - Cosmos DataBank mobile App");
            });
        }).catch(err => {
            // console.log(err.stack); 
        });
}

function saveFile(res: imageSource.ImageSource) {
    var name = viewModel.get("contextItem").id + "" + viewModel.get("contextItem").earthDate;

    var fileName = name + ".jpeg";

    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        var cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    } else if (application.ios) {
        // TODO :  this works - but where are the images ?
        var iosDownloadPath = fileSystem.knownFolders.documents();
        // tslint:disable-next-line:no-shadowed-variable
        var cosmosFolderPath = fileSystem.path.join(iosDownloadPath.path, "CosmosDataBank");
    }

    var folder = fileSystem.Folder.fromPath(cosmosFolderPath);
    var path = fileSystem.path.join(cosmosFolderPath, fileName);
    var exists = fileSystem.File.exists(path);

    if (!exists) {
        var saved = res.saveToFile(path, enums.ImageFormat.jpeg);
    }

    currentSavedPath = path;
}

export function onSaveImage(args: EventData) {

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                saveFile(res);
            }).catch(err => {
                // console.log(err);
            });
    } else if (application.android) {
        saveFile(currentImage);
        toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }
}

export function onSetWallpaper(args: EventData) {

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                currentImage = res; // TODO : set wallpaper for iOS
            }).catch(err => {
                // console.log(err);
            });;
    } else if (application.android) {

        saveFile(currentImage);

        var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            var imageToSet = imageSource.fromFile(currentSavedPath);
            wallpaperManager.setBitmap(imageToSet.android);
        } catch (error) {
            // console.log(error);
        }

        toast.makeText("Wallpaper Set!").show();
    }
}

export function onShare(args: EventData) {
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA APOD");
    } else if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                SocialShare.shareImage(res);
            }).catch(err => {
                // console.log(err);
            });
    }
}