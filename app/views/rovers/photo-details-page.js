"use strict";
var observable_1 = require("data/observable");
var frame_1 = require("ui/frame");
var utils = require("utils/utils");
var enums = require("ui/enums");
var fileSystem = require("file-system");
var imageSource = require("image-source");
var application = require("application");
var SocialShare = require("nativescript-social-share");
if (application.android) {
    var toast = require("nativescript-toast");
}
var viewModel;
var shareButtonAndroid;
var page;
var shareButton;
var saveButton;
var desktopButton;
var iosImage;
var currentImage;
var currentSavedPath;
function onPageLoaded(args) {
    page = args.object;
    shareButton = page.getViewById("btn-shar");
    saveButton = page.getViewById("btn-save");
    desktopButton = page.getViewById("btn-desk");
    if (application.ios) {
        iosImage = page.getViewById("ios-image");
    }
    var navContext = page.navigationContext;
    viewModel = new observable_1.Observable();
    viewModel.set("contextItem", navContext["tappedItem"]);
    viewModel.set("isItemVisible", false);
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
function onFinalImageSet(args) {
    var drawee = args.object;
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res) {
        currentImage = res;
        viewModel.set("isItemVisible", true);
        shareButton.on("tap", function (args) {
            console.log("Android share tapped!");
            SocialShare.shareImage(res, "Mars Rovers - Cosmos DataBank mobile App");
        });
    }).catch(function (err) {
        // console.log(err.stack); 
    });
}
exports.onFinalImageSet = onFinalImageSet;
function saveFile(res) {
    var name = viewModel.get("contextItem").id + "" + viewModel.get("contextItem").earthDate;
    var fileName = name + ".jpeg";
    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        var cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    }
    else if (application.ios) {
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
    if (application.android) {
        SocialShare.shareImage(currentImage, "Mars Rovers");
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
//# sourceMappingURL=photo-details-page.js.map