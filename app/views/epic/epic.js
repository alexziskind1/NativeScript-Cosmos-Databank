"use strict";
var application = require("application");
var fileSystem = require("file-system");
var imageSource = require("image-source");
var utils = require("utils/utils");
var SocialShare = require("nativescript-social-share");
if (application.android) {
    var toast = require("nativescript-toast");
}
var epic_model_1 = require("../../view-models/epic/epic-model");
var epicViewModel = new epic_model_1.EpicViewModel();
var page;
var shareButton;
var saveButton;
var desktopButton;
var iosImage;
var currentImage;
var currentSavedPath;
function onPageLoaded(args) {
    page = args.object;
}
exports.onPageLoaded = onPageLoaded;
function onScrollSwipe(args) {
    // if (args.direction === 1) {
    //     previousDate();
    // } else if (args.direction === 2) {
    //     nextDate();
    // }   
}
exports.onScrollSwipe = onScrollSwipe;
function onPageNavigatedTo(args) {
    page = args.object;
    var pageContainer = page.getViewById("pageContainer");
    shareButton = page.getViewById("btn-share");
    saveButton = page.getViewById("btn-save");
    desktopButton = page.getViewById("btn-desk");
    if (application.android) {
        setButtonsOpacity(0.2);
        setUserInteraction(false);
    }
    if (application.ios) {
        iosImage = page.getViewById("ios-image");
    }
    if (!epicViewModel.get("dataItem")) {
        epicViewModel.initDataItems();
    }
    pageContainer.bindingContext = epicViewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
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
        toast.makeText("Wallpaper Set!").show();
    }
}
exports.onSetWallpaper = onSetWallpaper;
function onShare(args) {
    if (application.android) {
        SocialShare.shareImage(currentImage, "NASA EPIC");
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
function previousDate() {
    // if (application.android) {
    //     setButtonsOpacity(0.2);
    //     setUserInteraction(false);
    // }
    // // TODO: add check if the date is not too far in the past (check first EPIC date)
    // var currentDate = epicViewModel.get("selectedDate");
    // currentDate.setDate(currentDate.getDate()-1);
    // epicViewModel.set("selectedDate", currentDate);
    // epicViewModel.initDataItems(); 
}
exports.previousDate = previousDate;
function nextDate() {
    // if (application.android) {
    //     setButtonsOpacity(0.2);
    //     setUserInteraction(false);
    // }
    // var currentDate = epicViewModel.get("selectedDate");
    // if (currentDate >= new Date()) {
    //     if (application.android) {
    //         toast.makeText("Can not load photos from future!").show();
    //     }
    // } else {
    //     currentDate.setDate(currentDate.getDate()+1);
    //     epicViewModel.set("selectedDate", currentDate);
    //     epicViewModel.initDataItems(); 
    // }
}
exports.nextDate = nextDate;
function onSubmit(args) {
    console.log("on submit ");
}
exports.onSubmit = onSubmit;
function onFinalImageSet(args) {
    var drawee = args.object;
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res) {
        currentImage = res;
        saveButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (resu) { return saveButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (resul) { return saveButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        desktopButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (resu) { return desktopButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (resul) { return desktopButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        shareButton.animate({ opacity: 0.2, rotate: 360 })
            .then(function (resu) { return shareButton.animate({ opacity: 0.5, rotate: 180, duration: 150 }); })
            .then(function (resul) { return shareButton.animate({ opacity: 1.0, rotate: 0, duration: 150 }); });
        setUserInteraction(true);
    }).catch(function (err) {
        // console.log(err.stack);
    });
}
exports.onFinalImageSet = onFinalImageSet;
function saveFile(res) {
    var url = epicViewModel.get("dataItem").url;
    var fileName = url.substring(url.lastIndexOf("/") + 1);
    var n = fileName.indexOf(".");
    fileName = fileName.substring(0, n !== -1 ? n : fileName.length) + ".jpeg";
    if (application.android) {
        // tslint:disable-next-line:max-line-length
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
        var saved = res.saveToFile(path, "jpeg");
    }
    currentSavedPath = path;
}
exports.saveFile = saveFile;
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
function formatDate(date) {
    var d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [year, month, day].join("-");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVwaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVdBLHlDQUE0QztBQUk1Qyx3Q0FBMkM7QUFDM0MsMENBQTZDO0FBRTdDLG1DQUFxQztBQUlyQyx1REFBeUQ7QUFFekQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELGdFQUE0RTtBQUM1RSxJQUFJLGFBQWEsR0FBRyxJQUFJLDBCQUFhLEVBQUUsQ0FBQztBQUV4QyxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksV0FBbUIsQ0FBQztBQUN4QixJQUFJLFVBQWtCLENBQUM7QUFDdkIsSUFBSSxhQUFxQixDQUFDO0FBQzFCLElBQUksUUFBZSxDQUFDO0FBQ3BCLElBQUksWUFBcUMsQ0FBQztBQUUxQyxJQUFJLGdCQUF3QixDQUFDO0FBRTdCLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUM7QUFGRCxvQ0FFQztBQUVELHVCQUE4QixJQUEyQjtJQUNyRCw4QkFBOEI7SUFDOUIsc0JBQXNCO0lBQ3RCLHFDQUFxQztJQUNyQyxrQkFBa0I7SUFDbEIsT0FBTztBQUNYLENBQUM7QUFORCxzQ0FNQztBQUVELDJCQUFrQyxJQUFlO0lBQzdDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksYUFBYSxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRW5FLFdBQVcsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELFVBQVUsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELGFBQWEsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFVB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LENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxRixJQUFJLENBQUMsVUFBQSxLQUFLLElBQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRixhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDL0MsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdGLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxHLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzthQUM3QyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0YsSUFBSSxDQUFDLFVB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YXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMsIEdlc3R1cmVFdmVudERhdGEsIFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuXHJcbmltcG9ydCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IGNvbG9yID0gcmVxdWlyZShcImNvbG9yXCIpO1xyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5pbXBvcnQgZW51bXMgPSByZXF1aXJlKFwidWkvZW51bXNcIik7XHJcbmltcG9ydCBmaWxlU3lzdGVtID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xyXG5pbXBvcnQgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm1Nb2R1bGUgPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuaW1wb3J0IGRyYXdlck1vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyXCIpO1xyXG5pbXBvcnQgeyBGcmVzY29EcmF3ZWUsIEZpbmFsRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mcmVzY29cIjtcclxuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcclxuXHJcbmlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICB2YXIgdG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xyXG59XHJcblxyXG5pbXBvcnQgeyBFcGljVmlld01vZGVsLCBFcGljSXRlbSB9IGZyb20gXCIuLi8uLi92aWV3LW1vZGVscy9lcGljL2VwaWMtbW9kZWxcIjtcclxubGV0IGVwaWNWaWV3TW9kZWwgPSBuZXcgRXBpY1ZpZXdNb2RlbCgpO1xyXG5cclxubGV0IHBhZ2U6IFBhZ2U7XHJcbmxldCBzaGFyZUJ1dHRvbjogQnV0dG9uO1xyXG5sZXQgc2F2ZUJ1dHRvbjogQnV0dG9uO1xyXG5sZXQgZGVza3RvcEJ1dHRvbjogQnV0dG9uO1xyXG5sZXQgaW9zSW1hZ2U6IEltYWdlO1xyXG5sZXQgY3VycmVudEltYWdlOiBpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZTtcclxuXHJcbnZhciBjdXJyZW50U2F2ZWRQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TY3JvbGxTd2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgIC8vIGlmIChhcmdzLmRpcmVjdGlvbiA9PT0gMSkge1xyXG4gICAgLy8gICAgIHByZXZpb3VzRGF0ZSgpO1xyXG4gICAgLy8gfSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PT0gMikge1xyXG4gICAgLy8gICAgIG5leHREYXRlKCk7XHJcbiAgICAvLyB9ICAgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VOYXZpZ2F0ZWRUbyhhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIHZhciBwYWdlQ29udGFpbmVyID0gPFN0YWNrTGF5b3V0PnBhZ2UuZ2V0Vmlld0J5SWQoXCJwYWdlQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIHNoYXJlQnV0dG9uID0gPEJ1dHRvbj5wYWdlLmdldFZpZXdCeUlkKFwiYnRuLXNoYXJlXCIpO1xyXG4gICAgc2F2ZUJ1dHRvbiA9IDxCdXR0b24+cGFnZS5nZXRWaWV3QnlJZChcImJ0bi1zYXZlXCIpO1xyXG4gICAgZGVza3RvcEJ1dHRvbiA9IDxCdXR0b24+cGFnZS5nZXRWaWV3QnlJZChcImJ0bi1kZXNrXCIpO1xyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgICAgc2V0QnV0dG9uc09wYWNpdHkoMC4yKTtcclxuICAgICAgICBzZXRVc2VySW50ZXJhY3Rpb24oZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcclxuICAgICAgICBpb3NJbWFnZSA9IDxJbWFnZT5wYWdlLmdldFZpZXdCeUlkKFwiaW9zLWltYWdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZXBpY1ZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKSkge1xyXG4gICAgICAgIGVwaWNWaWV3TW9kZWwuaW5pdERhdGFJdGVtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhZ2VDb250YWluZXIuYmluZGluZ0NvbnRleHQgPSBlcGljVmlld01vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TYXZlSW1hZ2UoYXJnczogRXZlbnREYXRhKSB7XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xyXG4gICAgICAgIGltYWdlU291cmNlLmZyb21VcmwoaW9zSW1hZ2Uuc3JjKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUZpbGUocmVzKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgICAgc2F2ZUZpbGUoY3VycmVudEltYWdlKTtcclxuICAgICAgICB0b2FzdC5tYWtlVGV4dChcIlBob3RvIHNhdmVkIGluIC9Eb3dubG9hZHMvQ29zbW9zRGF0YUJhbmsvXCIpLnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uU2V0V2FsbHBhcGVyKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcclxuICAgICAgICBpbWFnZVNvdXJjZS5mcm9tVXJsKGlvc0ltYWdlLnNyYylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZSA9IHJlczsgLy8gVE9ETyA6IHNldCB3YWxscGFwZXIgZm9yIGlPU1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgfSk7IDtcclxuICAgIH0gZWxzZSBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG5cclxuICAgICAgICBzYXZlRmlsZShjdXJyZW50SW1hZ2UpO1xyXG5cclxuICAgICAgICB2YXIgd2FsbHBhcGVyTWFuYWdlciA9IGFuZHJvaWQuYXBwLldhbGxwYXBlck1hbmFnZXIuZ2V0SW5zdGFuY2UodXRpbHMuYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCkpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZVRvU2V0ID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUoY3VycmVudFNhdmVkUGF0aCk7XHJcbiAgICAgICAgICAgIHdhbGxwYXBlck1hbmFnZXIuc2V0Qml0bWFwKGltYWdlVG9TZXQuYW5kcm9pZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9hc3QubWFrZVRleHQoXCJXYWxscGFwZXIgU2V0IVwiKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblNoYXJlKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZUltYWdlKGN1cnJlbnRJbWFnZSwgXCJOQVNBIEVQSUNcIik7XHJcbiAgICB9IGVsc2UgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xyXG4gICAgICAgIGltYWdlU291cmNlLmZyb21VcmwoaW9zSW1hZ2Uuc3JjKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVJbWFnZShyZXMpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0RhdGUoKSB7XHJcbiAgICAvLyBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgLy8gICAgIHNldEJ1dHRvbnNPcGFjaXR5KDAuMik7XHJcbiAgICAvLyAgICAgc2V0VXNlckludGVyYWN0aW9uKGZhbHNlKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvLyBUT0RPOiBhZGQgY2hlY2sgaWYgdGhlIGRhdGUgaXMgbm90IHRvbyBmYXIgaW4gdGhlIHBhc3QgKGNoZWNrIGZpcnN0IEVQSUMgZGF0ZSlcclxuICAgIC8vIHZhciBjdXJyZW50RGF0ZSA9IGVwaWNWaWV3TW9kZWwuZ2V0KFwic2VsZWN0ZWREYXRlXCIpO1xyXG4gICAgLy8gY3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCktMSk7XHJcbiAgICAvLyBlcGljVmlld01vZGVsLnNldChcInNlbGVjdGVkRGF0ZVwiLCBjdXJyZW50RGF0ZSk7XHJcbiAgICAvLyBlcGljVmlld01vZGVsLmluaXREYXRhSXRlbXMoKTsgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0RGF0ZSgpIHtcclxuICAgIC8vIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAvLyAgICAgc2V0QnV0dG9uc09wYWNpdHkoMC4yKTtcclxuICAgIC8vICAgICBzZXRVc2VySW50ZXJhY3Rpb24oZmFsc2UpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHZhciBjdXJyZW50RGF0ZSA9IGVwaWNWaWV3TW9kZWwuZ2V0KFwic2VsZWN0ZWREYXRlXCIpO1xyXG4gICAgLy8gaWYgKGN1cnJlbnREYXRlID49IG5ldyBEYXRlKCkpIHtcclxuICAgIC8vICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgLy8gICAgICAgICB0b2FzdC5tYWtlVGV4dChcIkNhbiBub3QgbG9hZCBwaG90b3MgZnJvbSBmdXR1cmUhXCIpLnNob3coKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpKzEpO1xyXG4gICAgLy8gICAgIGVwaWNWaWV3TW9kZWwuc2V0KFwic2VsZWN0ZWREYXRlXCIsIGN1cnJlbnREYXRlKTtcclxuICAgIC8vICAgICBlcGljVmlld01vZGVsLmluaXREYXRhSXRlbXMoKTsgXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblN1Ym1pdChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwib24gc3VibWl0IFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRmluYWxJbWFnZVNldChhcmdzOiBGaW5hbEV2ZW50RGF0YSkge1xyXG4gICAgdmFyIGRyYXdlZSA9IGFyZ3Mub2JqZWN0IGFzIEZyZXNjb0RyYXdlZTtcclxuXHJcbiAgICBpbWFnZVNvdXJjZS5mcm9tVXJsKGRyYXdlZS5pbWFnZVVyaSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50SW1hZ2UgPSByZXM7XHJcblxyXG4gICAgICAgICAgICBzYXZlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjIsIHJvdGF0ZTogMzYwIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1ID0+IHsgcmV0dXJuIHNhdmVCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDAuNSwgcm90YXRlOiAxODAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bCA9PiB7IHJldHVybiBzYXZlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAxLjAsIHJvdGF0ZTogMCwgZHVyYXRpb246IDE1MCB9KTsgfSk7XHJcblxyXG4gICAgICAgICAgICBkZXNrdG9wQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjIsIHJvdGF0ZTogMzYwIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1ID0+IHsgcmV0dXJuIGRlc2t0b3BCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDAuNSwgcm90YXRlOiAxODAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bCA9PiB7IHJldHVybiBkZXNrdG9wQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAxLjAsIHJvdGF0ZTogMCwgZHVyYXRpb246IDE1MCB9KTsgfSk7XHJcblxyXG4gICAgICAgICAgICBzaGFyZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC4yLCByb3RhdGU6IDM2MCB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdSA9PiB7IHJldHVybiBzaGFyZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC41LCByb3RhdGU6IDE4MCwgZHVyYXRpb246IDE1MCB9KTsgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsID0+IHsgcmV0dXJuIHNoYXJlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAxLjAsIHJvdGF0ZTogMCwgZHVyYXRpb246IDE1MCB9KTsgfSk7XHJcblxyXG4gICAgICAgICAgICBzZXRVc2VySW50ZXJhY3Rpb24odHJ1ZSk7XHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlRmlsZShyZXM6IGltYWdlU291cmNlLkltYWdlU291cmNlKSB7XHJcbiAgICB2YXIgdXJsID0gZXBpY1ZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKS51cmw7XHJcbiAgICB2YXIgZmlsZU5hbWUgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgIHZhciBuID0gZmlsZU5hbWUuaW5kZXhPZihcIi5cIik7XHJcbiAgICBmaWxlTmFtZSA9IGZpbGVOYW1lLnN1YnN0cmluZygwLCBuICE9PSAtMSA/IG4gOiBmaWxlTmFtZS5sZW5ndGgpICsgXCIuanBlZ1wiO1xyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIHZhciBhbmRyb2lkRG93bmxvYWRzUGF0aCA9IGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlUHVibGljRGlyZWN0b3J5KGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUykudG9TdHJpbmcoKTtcclxuICAgICAgICB2YXIgY29zbW9zRm9sZGVyUGF0aCA9IGZpbGVTeXN0ZW0ucGF0aC5qb2luKGFuZHJvaWREb3dubG9hZHNQYXRoLCBcIkNvc21vc0RhdGFCYW5rXCIpO1xyXG4gICAgfSBlbHNlIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcclxuICAgICAgICAvLyBUT0RPIDogIHRoaXMgd29ya3MgLSBidXQgd2hlcmUgYXJlIHRoZSBpbWFnZXMgP1xyXG4gICAgICAgIHZhciBpb3NEb3dubG9hZFBhdGggPSBmaWxlU3lzdGVtLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcclxuICAgICAgICB2YXIgY29zbW9zRm9sZGVyUGF0aCA9IGZpbGVTeXN0ZW0ucGF0aC5qb2luKGlvc0Rvd25sb2FkUGF0aC5wYXRoLCBcIkNvc21vc0RhdGFCYW5rXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmb2xkZXIgPSBmaWxlU3lzdGVtLkZvbGRlci5mcm9tUGF0aChjb3Ntb3NGb2xkZXJQYXRoKTtcclxuICAgIHZhciBwYXRoID0gZmlsZVN5c3RlbS5wYXRoLmpvaW4oY29zbW9zRm9sZGVyUGF0aCwgZmlsZU5hbWUpO1xyXG4gICAgdmFyIGV4aXN0cyA9IGZpbGVTeXN0ZW0uRmlsZS5leGlzdHMocGF0aCk7XHJcblxyXG4gICAgaWYgKCFleGlzdHMpIHtcclxuICAgICAgICB2YXIgc2F2ZWQgPSByZXMuc2F2ZVRvRmlsZShwYXRoLCBcImpwZWdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudFNhdmVkUGF0aCA9IHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbklvc1NoYXJlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJpT1Mgc2hhcmUgdGFwcGVkISAxXCIpO1xyXG4gICAgY29uc29sZS5sb2coaW9zSW1hZ2Uuc3JjKTtcclxuXHJcbiAgICBpbWFnZVNvdXJjZS5mcm9tVXJsKGlvc0ltYWdlLnNyYylcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZUltYWdlKHJlcyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLnNzdGFjayk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShkYXRlKSxcclxuICAgICAgICBtb250aCA9IFwiXCIgKyAoZC5nZXRNb250aCgpICsgMSksXHJcbiAgICAgICAgZGF5ID0gXCJcIiArIGQuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgaWYgKG1vbnRoLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICBtb250aCA9IFwiMFwiICsgbW9udGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRheS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgZGF5ID0gXCIwXCIgKyBkYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XS5qb2luKFwiLVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0VXNlckludGVyYWN0aW9uKHN0YXRlOiBib29sZWFuKSB7XHJcbiAgICBzaGFyZUJ1dHRvbi5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBzdGF0ZTtcclxuICAgIHNhdmVCdXR0b24uaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gc3RhdGU7XHJcbiAgICBkZXNrdG9wQnV0dG9uLmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IHN0YXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRCdXR0b25zT3BhY2l0eSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBzYXZlQnV0dG9uLm9wYWNpdHkgPSB2YWx1ZTtcclxuICAgIGRlc2t0b3BCdXR0b24ub3BhY2l0eSA9IHZhbHVlO1xyXG4gICAgc2hhcmVCdXR0b24ub3BhY2l0eSA9IHZhbHVlO1xyXG59XHJcbiJdfQ==