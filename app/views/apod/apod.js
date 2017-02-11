"use strict";
var application = require("application");
var imageSource = require("image-source");
var utils = require("utils/utils");
var SocialShare = require("nativescript-social-share");
var youtubeHelpers = require("../helpers/youtube/youtube-helpers");
var formatters = require("../helpers/formaters");
var file_helpers_1 = require("../helpers/files/file-helpers");
var firebase_1 = require("../helpers/firebase/firebase");
if (application.android) {
    var toast = require("nativescript-toast");
    var youtube = require("nativescript-youtube-player");
}
var credentials_1 = require("../../files/credentials");
var apod_model_1 = require("../../view-models/apod/apod-model");
var apodViewModel = new apod_model_1.ApodViewModel();
apodViewModel.set("isPlayerVisible", false);
apodViewModel.set("youtube_api_key", credentials_1.YOUTUBE_API_KEY);
apodViewModel.set("youtube_video_key", "2zNSgSzhBfM");
var page;
var shareButton;
var saveButton;
var desktopButton;
var iosImage;
var currentImage;
var currentSavedPath;
var player;
function onPageLoaded(args) {
    page = args.object;
}
exports.onPageLoaded = onPageLoaded;
function onScrollSwipe(args) {
    if (args.direction === 1) {
        previousDate();
    }
    else if (args.direction === 2) {
        nextDate();
    }
}
exports.onScrollSwipe = onScrollSwipe;
function onPageNavigatedTo(args) {
    page = args.object;
    shareButton = page.getViewById("btn-shar");
    saveButton = page.getViewById("btn-save");
    desktopButton = page.getViewById("btn-desk");
    if (application.android) {
        player = page.getViewById("player");
        file_helpers_1.setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        file_helpers_1.setUserInteraction(shareButton, saveButton, desktopButton, false);
    }
    if (application.ios) {
        iosImage = page.getViewById("ios-image");
    }
    if (!apodViewModel.get("dataItem")) {
        apodViewModel.initDataItems().then(function (res) {
            console.log(apodViewModel.get("dataItem").media_type === "video");
            if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
                initPlayer();
            }
            else {
                player.pause();
                apodViewModel.set("isPlayerVisible", false);
            }
        });
    }
    page.bindingContext = apodViewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
function previousDate() {
    if (application.android) {
        file_helpers_1.setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        file_helpers_1.setUserInteraction(shareButton, saveButton, desktopButton, false);
    }
    // TODO: add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate() - 1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.initDataItems(formatters.formatDate(currentDate)).then(function (res) {
        if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
            initPlayer();
        }
        else {
            player.pause();
            apodViewModel.set("isPlayerVisible", false);
        }
    });
}
exports.previousDate = previousDate;
function nextDate() {
    if (application.android) {
        file_helpers_1.setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
        file_helpers_1.setUserInteraction(shareButton, saveButton, desktopButton, false);
    }
    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate >= new Date()) {
        if (application.android) {
            toast.makeText("Can not load photos from the future!").show();
        }
    }
    else {
        currentDate.setDate(currentDate.getDate() + 1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.initDataItems(formatters.formatDate(currentDate)).then(function (res) {
            if (application.android && (apodViewModel.get("dataItem").media_type === "video")) {
                initPlayer();
            }
            else {
                player.pause();
                apodViewModel.set("isPlayerVisible", false);
            }
        });
    }
}
exports.nextDate = nextDate;
function onFinalImageSet(args) {
    console.log("onFinalImageSet");
    var drawee = args.object;
    currentImage = file_helpers_1.setCurrentImage(drawee.imageUri);
    saveButton.animate({ opacity: 0.2, rotate: 360 })
        .then(function () { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(function () { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
    desktopButton.animate({ opacity: 0.2, rotate: 360 })
        .then(function () { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(function () { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
    shareButton.animate({ opacity: 0.2, rotate: 360 })
        .then(function () { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
        .then(function () { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); })
        .then(function () { file_helpers_1.setUserInteraction(shareButton, saveButton, desktopButton, true); });
}
exports.onFinalImageSet = onFinalImageSet;
function onSaveImage(args) {
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            file_helpers_1.saveFile(res, apodViewModel.get("dataItem").url, currentSavedPath);
        }).catch(function (err) {
            console.log(err);
        });
    }
    else if (application.android) {
        file_helpers_1.saveFile(currentImage, apodViewModel.get("dataItem").url, currentSavedPath);
        toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }
}
exports.onSaveImage = onSaveImage;
function onSetWallpaper(args) {
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            currentImage = res; // TODO : set wallpaper for iOS
        }).catch(function (err) {
            console.log(err);
        });
        ;
    }
    else if (application.android) {
        file_helpers_1.saveFile(currentImage, apodViewModel.get("dataItem").url, currentSavedPath);
        var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            wallpaperManager.setBitmap(currentImage.android);
        }
        catch (error) {
            console.log(error);
        }
        toast.makeText("Wallpaper Set!").show();
    }
}
exports.onSetWallpaper = onSetWallpaper;
function onShare(args) {
    firebase_1.firebasePush(apodViewModel.get("dataItem"));
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA APOD");
    }
    else if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            SocialShare.shareImage(res);
        }).catch(function (err) {
            console.log(err);
        });
    }
}
exports.onShare = onShare;
function initPlayer() {
    var mediaUrl = apodViewModel.get("dataItem").url;
    if (mediaUrl.indexOf("youtube") >= 0) {
        apodViewModel.set("isPlayerVisible", true);
        var youtubeID = youtubeHelpers.getYouTubeID(mediaUrl);
        player.loadVideo(youtubeID, 10); // pass the actual video here or load web-view
        player.play();
    }
    else {
        player.pause();
        apodViewModel.set("isPlayerVisible", false);
    }
}
