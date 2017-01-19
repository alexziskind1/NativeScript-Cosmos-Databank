import { EventData } from "data/observable";
import { Button } from "ui/button";
import { Image } from "ui/image";
import { GestureTypes, SwipeGestureEventData } from "ui/gestures";
import { Page } from "ui/page";
import application = require("application");
import imageSource = require("image-source");
import * as utils from "utils/utils";

import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";
import * as firebase from "nativescript-plugin-firebase";

import * as youtubeHelpers from "../helpers/youtube/youtube-helpers";
import * as formatters from "../helpers/formaters";
import { saveFile, setButtonsOpacity, setUserInteraction, setCurrentImage } from "../helpers/files/file-helpers";

if (application.android) {
    var toast = require("nativescript-toast");
    var youtube = require("nativescript-youtube-player");
}

import { YOUTUBE_API_KEY } from "../../files/credentials";
import { ApodViewModel } from "../../view-models/apod/apod-model";

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
        setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        setUserInteraction(shareButton, saveButton, desktopButton, false);
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
        setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        setUserInteraction(shareButton, saveButton, desktopButton, false);
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
        setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        setUserInteraction(shareButton, saveButton, desktopButton, false);
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

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                saveFile(res, apodViewModel.get("dataItem").url, currentSavedPath);
            }).catch(err => {
                console.log(err);
            });
    } else if (application.android) {
        saveFile(currentImage, apodViewModel.get("dataItem").url, currentSavedPath);
        toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }
}

export function onSetWallpaper(args: EventData) {

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(res => {
                currentImage = res; // TODO : set wallpaper for iOS
            }).catch(err => {
                console.log(err);
            });;
    } else if (application.android) {
        saveFile(currentImage, apodViewModel.get("dataItem").url, currentSavedPath);

        var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            var imageToSet = imageSource.fromFile(currentSavedPath);
            wallpaperManager.setBitmap(imageToSet.android);
        } catch (error) {
            console.log(error);
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
                console.log(err);
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
