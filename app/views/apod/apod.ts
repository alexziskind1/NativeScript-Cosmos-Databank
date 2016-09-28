import { EventData, PropertyChangeData } from "data/observable";
import { Button } from "ui/button";
import { Image } from "ui/image";
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
import * as utils from 'utils/utils';

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import { FrescoDrawee, FinalEventData } from "nativescript-fresco";
import * as SocialShare from "nativescript-social-share";

if (application.android) {
    var Toast = require("nativescript-toast");
}

import { ApodViewModel, ApodItem } from "../../models/apod/apod-model";
let apodViewModel = new ApodViewModel();

let page : Page;
let shareButton : Button;
let saveButton : Button;
let desktopButton : Button;
let iosImage : Image;
let currentImage: imageSource.ImageSource;

var currentSavedPath : string;

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
    var pageContainer = <StackLayout>page.getViewById("pageContainer");

    shareButton = <Button>page.getViewById("btn-share");
    saveButton = <Button>page.getViewById("btn-save");
    desktopButton = <Button>page.getViewById("btn-desk");

    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    if (application.ios) {
        iosImage = <Image>page.getViewById("ios-image");
    }

    if (!apodViewModel.get("dataItem")) {
        apodViewModel.initDataItems();
    }

    pageContainer.bindingContext = apodViewModel;
}

export function onSaveImage(args: EventData)  {

    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res: imageSource.ImageSource) {           
                saveFile(res);
            }, function (error) {
                // console.log("Error loading image: " + error);
        }); 
    } else if (application.android) {
        saveFile(currentImage);
        Toast.makeText("Photo saved in /Downloads/CosmosDataBank/").show();
    }

}

export function onSetWallpaper(args: EventData) {
    
    if (application.ios) {
        imageSource.fromUrl(iosImage.src)
            .then(function (res: imageSource.ImageSource) {           
                currentImage = res;
            }, function (error) {
                // console.log("Error loading image: " + error);
        }); 
    } else if (application.android) {

        saveFile(currentImage);

        var wallpaperManager = android.app.WallpaperManager.getInstance(utils.ad.getApplicationContext());
        try {
            var imageToSet = imageSource.fromFile(currentSavedPath);
            wallpaperManager.setBitmap(imageToSet.android);
        } catch (error) {
            console.log(error);
        }

        Toast.makeText("Wallpaper Set!").show();
    }

    console.log("Wallpaper Set!");
}

export function onShare(args: EventData) {
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA APOD");
        console.log("Share tapped! {android}");    
    } else if (application.ios) {
        console.log("iOS share tapped! 1");
        console.log(iosImage.src);

        imageSource.fromUrl(iosImage.src)
            .then(function (res: imageSource.ImageSource) {      

                console.log(res);
                console.log("iOS share tapped! 2");     
                SocialShare.shareImage(res);

            }, function (error) {
                console.log("Error loading image: " + error);
        }); 
    }
}

export function previousDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    // TODO: add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate()-1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.initDataItems(formatDate(currentDate)); 
}

export function nextDate() {
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }

    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate >= new Date()) {
        if (application.android) {
            Toast.makeText("Can not load photos from future!").show();
        }
    } else {
        currentDate.setDate(currentDate.getDate()+1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.initDataItems(formatDate(currentDate)); 
    }

}

export function onSubmit(args: EventData) {
    console.log("media_type: " + apodViewModel.get("dataItem").media_type);
    console.log("url: " + apodViewModel.get("dataItem").url);

    var mediaType = apodViewModel.get("dataItem").media_type;
    if (mediaType === "video") {
        // Needed player for youtube clips! 
        // Hide the fresco for images and show the video player instead
        // create a flag to know if video-player is active to change it on next() previous()
    }
}

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;

    imageSource.fromUrl(drawee.imageUri)
        .then(function (res: imageSource.ImageSource) {
            currentImage = res;         

            saveButton.animate({opacity: 0.2,rotate: 360})
            .then( function () { return saveButton.animate({opacity: 0.5,rotate: 180, duration: 150 }); })
            .then( function () { return saveButton.animate({opacity: 1.0, rotate: 0, duration: 150 }); });

            desktopButton.animate({opacity: 0.2,rotate: 360})
            .then( function () { return desktopButton.animate({opacity: 0.5,rotate: 180, duration: 150 }); })
            .then( function () { return desktopButton.animate({opacity: 1.0, rotate: 0, duration: 150 }); });

            shareButton.animate({opacity: 0.2,rotate: 360})
            .then( function () { return shareButton.animate({opacity: 0.5,rotate: 180, duration: 150 }); })
            .then( function () { return shareButton.animate({opacity: 1.0, rotate: 0, duration: 150 }); });
            
            setUserInteraction(true);

        }, function (error) {
            // console.log("Error loading image: " + error);
    })   
}

export function saveFile(res: imageSource.ImageSource) {
    var url = apodViewModel.get("dataItem").url;
    var fileName = url.substring(url.lastIndexOf("/") + 1);
    var n = fileName.indexOf('.');
    fileName = fileName.substring(0, n != -1 ? n : fileName.length) + ".jpeg";

    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();  
        var cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    } else if (application.ios) {
        // this works - but where are the images ?
        var iosDownloadPath = fileSystem.knownFolders.documents();
        var cosmosFolderPath = fileSystem.path.join(iosDownloadPath.path, "CosmosDataBank");  
    }

    var folder = fileSystem.Folder.fromPath(cosmosFolderPath);
    var path = fileSystem.path.join(cosmosFolderPath, fileName);
    var exists = fileSystem.File.exists(path);
    console.log(exists);

    if (!exists) {
        var saved = res.saveToFile(path, enums.ImageFormat.jpeg);
    }

    currentSavedPath = path;
}

export function onIosShare() {
    console.log("iOS share tapped! 1");
    console.log(iosImage.src);

    imageSource.fromUrl(iosImage.src)
        .then(function (res: imageSource.ImageSource) {      

            console.log(res);
            console.log("iOS share tapped! 2");     
            SocialShare.shareImage(res);

        }, function (error) {
            console.log("Error loading image: " + error);
    });    
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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