import { EventData, PropertyChangeData } from "data/observable";
import { Button } from "ui/button";
import { Image } from "ui/image";
import { ImageSource } from "image-source";
import { GestureTypes, GestureEventData, SwipeGestureEventData } from "ui/gestures";
import { GridLayout } from "ui/layouts/grid-layout";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";
import { ScrollView } from "ui/scroll-view";
import { StackLayout } from "ui/layouts/stack-layout";
import { topmost } from "ui/frame";

import application = require("application");
import color = require("color");
import dialogs = require("ui/dialogs");
import enums = require("ui/enums");
import fileSystem = require("file-system");
import imageSource = require("image-source");
import platformModule = require("platform");
import * as utils from "utils/utils";
import * as http from "http";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";
import * as firebase from "nativescript-plugin-firebase";

var okHttp = require("nativescript-okhttp");

import * as youtubeHelpers from "../helpers/youtube/youtube-helpers";
import * as formatters from "../helpers/formaters";

if (application.android) {
    var toast = require("nativescript-toast");
    var youtube = require("nativescript-youtube-player");
}

import { YOUTUBE_API_KEY } from "../../files/credentials";

import { ApodViewModel, ApodItem } from "../../view-models/apod/apod-model";

let apodViewModel = new ApodViewModel();
apodViewModel.set("isPlayerVisible", false);
apodViewModel.set("youtube_api_key", YOUTUBE_API_KEY);
apodViewModel.set("youtube_video_key", "2zNSgSzhBfM");

let page: Page;
let shareButton: Button;
let saveButton: Button;
let desktopButton: Button;
let iosImage: Image;
let currentImage: imageSource.ImageSource;

var currentSavedPath: string;
let player;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function onScrollSwipe(args: SwipeGestureEventData) {
    if (args.direction === 1) {
        previousDate();
    } else if (args.direction === 2) {
        nextDate();
    }
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;

    shareButton = <Button>page.getViewById("btn-shar");
    saveButton = <Button>page.getViewById("btn-save");
    desktopButton = <Button>page.getViewById("btn-desk");

    if (application.android) {
        player = page.getViewById("player");
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    if (application.ios) {
        iosImage = <Image>page.getViewById("ios-image");
    }

    if (!apodViewModel.get("dataItem")) {
        apodViewModel.initDataItems().then(res => {
            console.log(apodViewModel.get("dataItem").media_type === "video");
            if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
                initPlayer();
            } else {
                player.pause();
                apodViewModel.set("isPlayerVisible", false);
            }
        });
    }

    page.bindingContext = apodViewModel;
}

export function previousDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    // TODO: add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate() - 1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.initDataItems(formatters.formatDate(currentDate)).then(res => {
        if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
            initPlayer();
        } else {
            player.pause();
            apodViewModel.set("isPlayerVisible", false);
        }
    });
}

export function nextDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate >= new Date()) {
        if (application.android) {
            toast.makeText("Can not load photos from the future!").show();
        }
    } else {
        currentDate.setDate(currentDate.getDate() + 1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.initDataItems(formatters.formatDate(currentDate)).then(res => {
            if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
                initPlayer();
            } else {
                player.pause();
                apodViewModel.set("isPlayerVisible", false);
            }
        });
    }
}

function setCurrentImage(imageUri:string): ImageSource {
    // okhttp is blocking so no need to return Promise!
    var inputStream = okHttp.getImage(imageUri); 
    var image = imageSource.fromData(inputStream);

    return image;
}

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;

    console.log("drawee.imageUri:" + drawee.imageUri);
    console.log("apodViewModel: " + apodViewModel.get("dataItem").url)

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
        .then(() => { setUserInteraction(true) })


    // this one is returnint Response cannot be resolved as image in {N} 2.4.2
    // imageSource.fromUrl(drawee.imageUri)
    //     .then(res => {
    //         currentImage = res;

    //         saveButton.animate({ opacity: 0.2, rotate: 360 })
    //             .then(() => { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //             .then(() => { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });

    //         desktopButton.animate({ opacity: 0.2, rotate: 360 })
    //             .then(() => { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //             .then(() => { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });

    //         shareButton.animate({ opacity: 0.2, rotate: 360 })
    //             .then(() => { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //             .then(() => { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });

    //         setUserInteraction(true);

    //     }).catch(err => {
    //         console.log(err);
    //     });

}

function setUserInteraction(state: boolean) {
    shareButton.isUserInteractionEnabled = state;
    saveButton.isUserInteractionEnabled = state;
    desktopButton.isUserInteractionEnabled = state;
}

function setButtonsOpacity(value: number) {
    saveButton.opacity = value;
    desktopButton.opacity = value;
    shareButton.opacity = value;
}

function saveFile(res: imageSource.ImageSource) {
    var url = apodViewModel.get("dataItem").url;
    var fileName = url.substring(url.lastIndexOf("/") + 1);
    var n = fileName.indexOf(".");
    fileName = fileName.substring(0, n !== -1 ? n : fileName.length) + ".jpeg";

    var cosmosFolderPath;
    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    } else if (application.ios) {
        // TODO :  this works - but where are the images ?
        var iosDownloadPath = fileSystem.knownFolders.documents();
        cosmosFolderPath = fileSystem.path.join(iosDownloadPath.path, "CosmosDataBank");
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
    firebase.push(
        "/favorites",
        {
            "dataItem": apodViewModel.get("dataItem"),
            "updateTs": firebase["ServerValue"].TIMESTAMP
        }
    ).then(result => {
        console.log("created key: " + result.key);
    });

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

function initPlayer() {
    var mediaUrl = apodViewModel.get("dataItem").url;

    if (mediaUrl.indexOf("youtube") >= 0) {
        apodViewModel.set("isPlayerVisible", true);
        var youtubeID = youtubeHelpers.getYouTubeID(mediaUrl);
        player.loadVideo(youtubeID, 10); // pass the actual video here or load web-view
        player.play();
    } else {
        player.pause();
        apodViewModel.set("isPlayerVisible", false);
    }
}
