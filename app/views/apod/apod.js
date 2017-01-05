"use strict";
var application = require("application");
var enums = require("ui/enums");
var fileSystem = require("file-system");
var imageSource = require("image-source");
var utils = require("utils/utils");
var SocialShare = require("nativescript-social-share");
var firebase = require("nativescript-plugin-firebase");
var youtubeHelpers = require("../helpers/youtube/youtube-helpers");
var formatters = require("../helpers/formaters");
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
        setButtonsOpacity(0.2);
        setUserInteraction(false);
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
        setButtonsOpacity(0.2);
        setUserInteraction(false);
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
        setButtonsOpacity(0.2);
        setUserInteraction(false);
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
    var drawee = args.object;
    console.log("drawee.imageUri:" + drawee.imageUri);
    console.log("apodViewModel: " + apodViewModel.get("dataItem").url);
    // http.getFile(drawee.imageUri).then(res => {
    //     //currentImage = res
    //     console.log("res.path: " + res.path);
    //     try {
    //         currentImage = imageSource.fromFile(res.path);
    //         console.log(currentImage)
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     saveButton.animate({ opacity: 0.2, rotate: 360 })
    //         .then(() => { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //         .then(() => { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
    //     desktopButton.animate({ opacity: 0.2, rotate: 360 })
    //         .then(() => { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //         .then(() => { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
    //     shareButton.animate({ opacity: 0.2, rotate: 360 })
    //         .then(() => { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
    //         .then(() => { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
    //     setUserInteraction(true);
    // }).catch(err => {
    //     console.log("http.getImage error" + err);
    // });
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res) {
        currentImage = res;
        saveButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function () { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function () { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        desktopButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function () { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function () { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        shareButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function () { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function () { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        setUserInteraction(true);
    }).catch(function (err) {
        console.log(err);
    });
}
exports.onFinalImageSet = onFinalImageSet;
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
    var n = fileName.indexOf(".");
    fileName = fileName.substring(0, n !== -1 ? n : fileName.length) + ".jpeg";
    var cosmosFolderPath;
    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    }
    else if (application.ios) {
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
function onSaveImage(args) {
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            saveFile(res);
        }).catch(function (err) {
            // console.log(err);
        });
    }
    else if (application.android) {
        saveFile(currentImage);
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
            // console.log(err);
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
        toast.makeText("Wallpaper Set!").show();
    }
}
exports.onSetWallpaper = onSetWallpaper;
function onShare(args) {
    firebase.push("/favorites", {
        "dataItem": apodViewModel.get("dataItem"),
        "updateTs": firebase["ServerValue"].TIMESTAMP
    }).then(function (result) {
        console.log("created key: " + result.key);
    });
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA APOD");
    }
    else if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res) {
            SocialShare.shareImage(res);
        }).catch(function (err) {
            // console.log(err);
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
//# sourceMappingURL=apod.js.map