"use strict";
var observable_1 = require("data/observable");
var frame_1 = require("ui/frame");
var application = require("application");
var imageSource = require("image-source");
var utils = require("utils/utils");
var SocialShare = require("nativescript-social-share");
if (application.android) {
    var toast = require("nativescript-toast");
}
var file_helpers_1 = require("../helpers/files/file-helpers");
var viewModel;
var page;
var shareButton;
var saveButton;
var desktopButton;
var iosImage;
var currentImage;
var currentSavedPath;
function onPageNavigatedTo(args) {
    page = args.object;
    shareButton = page.getViewById("btn-shar");
    saveButton = page.getViewById("btn-save");
    desktopButton = page.getViewById("btn-desk");
    if (application.android) {
        file_helpers_1.setButtonsOpacity(shareButton, saveButton, desktopButton, 0.2);
    }
    if (application.ios) {
        iosImage = page.getViewById("ios-image");
    }
    var navContext = page.navigationContext;
    viewModel = new observable_1.Observable();
    viewModel.set("contextItem", navContext["tappedItem"]);
    page.bindingContext = viewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
function onFinalImageSet(args) {
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
            file_helpers_1.saveFile(res, viewModel.get("contextItem").imageUri, currentSavedPath);
        }).catch(function (err) {
            console.log(err);
        });
    }
    else if (application.android) {
        file_helpers_1.saveFile(currentImage, viewModel.get("contextItem").imageUri, currentSavedPath);
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
        file_helpers_1.saveFile(currentImage, viewModel.get("contextItem").imageUri, currentSavedPath);
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
    if (application.android) {
        SocialShare.shareImage(currentImage, "Mars Rovers");
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
