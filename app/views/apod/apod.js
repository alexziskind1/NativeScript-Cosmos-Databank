"use strict";
var application = require("application");
var enums = require("ui/enums");
var fileSystem = require("file-system");
var imageSource = require("image-source");
var utils = require('utils/utils');
var SocialShare = require("nativescript-social-share");
if (application.android) {
    var Toast = require("nativescript-toast");
}
var youtube = require("nativescript-youtube-player");
var YOUTUBE_API_KEY = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
var apod_model_1 = require("../../models/apod/apod-model");
var apodViewModel = new apod_model_1.ApodViewModel();
// apodViewModel.set("isPlayerVisible", false);
apodViewModel.set("youtube_api_key", YOUTUBE_API_KEY);
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
    console.log("onPageLoaded");
}
exports.onPageLoaded = onPageLoaded;
function onStackLoaded(args) {
    console.log("onStackLoaded");
}
exports.onStackLoaded = onStackLoaded;
function onScrollSwipe(args) {
    if (args.direction === 1) {
        previousDate();
    }
    else if (args.direction === 2) {
        nextDate();
    }
}
exports.onScrollSwipe = onScrollSwipe;
function getYouTubeID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    }
    else {
        console.log("Could not extract video ID.");
    }
}
function initPlayer() {
    if (apodViewModel.get("dataItem").media_type === "video") {
        var mediaUrl = apodViewModel.get("dataItem").url;
        console.log(apodViewModel.get("dataItem").url);
        console.log(apodViewModel.get("dataItem").url.indexOf("youtube") >= 0);
        console.log(mediaUrl.indexOf("youtube") >= 0);
        if (mediaUrl.indexOf("youtube") >= 0) {
            apodViewModel.set("isPlayerVisible", true);
            var youtubeID = getYouTubeID(mediaUrl);
            console.log("youtubeID: " + youtubeID);
            player.loadVideo(youtubeID, 10); // pass the actual video here or load web-view
            player.play();
        }
        else {
            player.pause();
            apodViewModel.set("isPlayerVisible", false);
        }
    }
    else {
        player.pause();
        apodViewModel.set("isPlayerVisible", false);
    }
}
function onPageNavigatedTo(args) {
    page = args.object;
    var pageContainer = page.getViewById("pageContainer");
    shareButton = page.getViewById("btn-share");
    saveButton = page.getViewById("btn-save");
    desktopButton = page.getViewById("btn-desk");
    player = page.getViewById("player");
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }
    if (application.ios) {
        iosImage = page.getViewById("ios-image");
    }
    if (!apodViewModel.get("dataItem")) {
        apodViewModel.initDataItems().then(function (res) {
            initPlayer();
        });
    }
    pageContainer.bindingContext = apodViewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
function previousDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }
    // TODO: add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate() - 1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.initDataItems(formatDate(currentDate)).then(function (res) {
        initPlayer();
    });
    console.log("previousDate");
}
exports.previousDate = previousDate;
function nextDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }
    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate >= new Date()) {
        if (application.android) {
            Toast.makeText("Can not load photos from future!").show();
        }
    }
    else {
        currentDate.setDate(currentDate.getDate() + 1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.initDataItems(formatDate(currentDate)).then(function (res) {
            initPlayer();
        });
    }
}
exports.nextDate = nextDate;
function onFinalImageSet(args) {
    var drawee = args.object;
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res) {
        currentImage = res;
        saveButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (res) { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (res) { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        desktopButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (res) { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (res) { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        shareButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (res) { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (res) { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        setUserInteraction(true);
    }).catch(function (err) {
        // console.log(err.stack);
    });
}
exports.onFinalImageSet = onFinalImageSet;
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function setUserInteraction(state) {
    shareButton.isUserInteractionEnabled = state;
    saveButton.isUserInteractionEnabled = state;
    desktopButton.isUserInteractionEnabled = state;
}
function setButtonsOpacity(value) {
    saveButton.opacity = value;
    desktopButton.opacity = value;
    shareButton.opacity = value;
}
function saveFile(res) {
    var url = apodViewModel.get("dataItem").url;
    var fileName = url.substring(url.lastIndexOf("/") + 1);
    var n = fileName.indexOf('.');
    fileName = fileName.substring(0, n != -1 ? n : fileName.length) + ".jpeg";
    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        var cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    }
    else if (application.ios) {
        // TODO :  this works - but where are the images ?
        var iosDownloadPath = fileSystem.knownFolders.documents();
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
exports.saveFile = saveFile;
function onSaveImage(args) {
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            saveFile(res);
        }).catch(function (err) {
            // console.log(err.stack);
        });
    }
    else if (application.android) {
        saveFile(currentImage);
        Toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }
}
exports.onSaveImage = onSaveImage;
function onSetWallpaper(args) {
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            currentImage = res; // TODO : set wallpaper for iOS
        }).catch(function (err) {
            // console.log(err.stack);
        });
        ;
    }
    else if (application.android) {
        saveFile(currentImage);
        var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            var imageToSet = imageSource.fromFile(currentSavedPath);
            wallpaperManager.setBitmap(imageToSet.android);
        }
        catch (error) {
        }
        Toast.makeText("Wallpaper Set!").show();
    }
}
exports.onSetWallpaper = onSetWallpaper;
function onShare(args) {
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA APOD");
    }
    else if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            SocialShare.shareImage(res);
        }).catch(function (err) {
            // console.log(err.stack);
        });
    }
}
exports.onShare = onShare;
function onIosShare() {
    console.log("iOS share tapped! 1");
    console.log(iosImage.src);
    imageSource.fromUrl(iosImage.src)
        .then(function (res) {
        SocialShare.shareImage(res);
    }).catch(function (err) {
        // console.log(err.sstack);
    });
}
exports.onIosShare = onIosShare;
//# sourceMappingURL=apod.js.map