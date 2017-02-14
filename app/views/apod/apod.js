"use strict";
var application = require("application");
var imageSource = require("image-source");
var utils = require("utils/utils");
var SocialShare = require("nativescript-social-share");
var youtubeHelpers = require("../helpers/youtube/youtube-helpers");
var formatters = require("../helpers/formaters");
var file_helpers_1 = require("../helpers/files/file-helpers");
var firebase_1 = require("../helpers/firebase/firebase");
// Android app only 
var toast = require("nativescript-toast");
// models, view-models, credentials
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
    firebase_1.firebasePush(apodViewModel.get("dataItem"), "save");
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
    firebase_1.firebasePush(apodViewModel.get("dataItem"), "wallpaper");
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
    firebase_1.firebasePush(apodViewModel.get("dataItem"), "share");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLHlDQUE0QztBQUM1QywwQ0FBNkM7QUFDN0MsbUNBQXFDO0FBR3JDLHVEQUF5RDtBQUV6RCxtRUFBcUU7QUFDckUsaURBQW1EO0FBQ25ELDhEQUFpSDtBQUNqSCx5REFBNEQ7QUFFNUQsb0JBQW9CO0FBQ3BCLDBDQUE0QztBQUc1QyxtQ0FBbUM7QUFDbkMsdURBQTBEO0FBQzFELGdFQUFrRTtBQUVsRSxJQUFJLGFBQWEsR0FBRyxJQUFJLDBCQUFhLEVBQUUsQ0FBQztBQUN4QyxhQUFhLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsNkJBQWUsQ0FBQyxDQUFDO0FBQ3RELGFBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFdEQsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLFdBQW1CLENBQUM7QUFDeEIsSUFBSSxVQUFrQixDQUFDO0FBQ3ZCLElBQUksYUFBcUIsQ0FBQztBQUMxQixJQUFJLFFBQWUsQ0FBQztBQUNwQixJQUFJLFlBQXFDLENBQUM7QUFFMUMsSUFBSSxnQkFBd0IsQ0FBQztBQUM3QixJQUFJLE1BQU0sQ0FBQztBQUVYLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUM7QUFGRCxvQ0FFQztBQUVELHVCQUE4QixJQUEyQjtJQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsWUFBWSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsUUFB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O0lBQ0ksSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFFakQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxTQUFTLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUMvRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMsIFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IEZyZXNjb0RyYXdlZSwgRmluYWxFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZyZXNjb1wiO1xyXG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tIFwibmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZVwiO1xyXG5cclxuaW1wb3J0ICogYXMgeW91dHViZUhlbHBlcnMgZnJvbSBcIi4uL2hlbHBlcnMveW91dHViZS95b3V0dWJlLWhlbHBlcnNcIjtcclxuaW1wb3J0ICogYXMgZm9ybWF0dGVycyBmcm9tIFwiLi4vaGVscGVycy9mb3JtYXRlcnNcIjtcclxuaW1wb3J0IHsgc2F2ZUZpbGUsIHNldEJ1dHRvbnNPcGFjaXR5LCBzZXRVc2VySW50ZXJhY3Rpb24sIHNldEN1cnJlbnRJbWFnZSB9IGZyb20gXCIuLi9oZWxwZXJzL2ZpbGVzL2ZpbGUtaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBmaXJlYmFzZVB1c2ggfSBmcm9tIFwiLi4vaGVscGVycy9maXJlYmFzZS9maXJlYmFzZVwiO1xyXG5cclxuLy8gQW5kcm9pZCBhcHAgb25seSBcclxuaW1wb3J0ICogYXMgdG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQgKiBhcyB5b3V0dWJlIGZyb20gXCJuYXRpdmVzY3JpcHQteW91dHViZS1wbGF5ZXJcIjtcclxuXHJcbi8vIG1vZGVscywgdmlldy1tb2RlbHMsIGNyZWRlbnRpYWxzXHJcbmltcG9ydCB7IFlPVVRVQkVfQVBJX0tFWSB9IGZyb20gXCIuLi8uLi9maWxlcy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgeyBBcG9kVmlld01vZGVsIH0gZnJvbSBcIi4uLy4uL3ZpZXctbW9kZWxzL2Fwb2QvYXBvZC1tb2RlbFwiO1xyXG5cclxubGV0IGFwb2RWaWV3TW9kZWwgPSBuZXcgQXBvZFZpZXdNb2RlbCgpO1xyXG5hcG9kVmlld01vZGVsLnNldChcImlzUGxheWVyVmlzaWJsZVwiLCBmYWxzZSk7XHJcbmFwb2RWaWV3TW9kZWwuc2V0KFwieW91dHViZV9hcGlfa2V5XCIsIFlPVVRVQkVfQVBJX0tFWSk7XHJcbmFwb2RWaWV3TW9kZWwuc2V0KFwieW91dHViZV92aWRlb19rZXlcIiwgXCIyek5TZ1N6aEJmTVwiKTtcclxuXHJcbmxldCBwYWdlOiBQYWdlO1xyXG5sZXQgc2hhcmVCdXR0b246IEJ1dHRvbjtcclxubGV0IHNhdmVCdXR0b246IEJ1dHRvbjtcclxubGV0IGRlc2t0b3BCdXR0b246IEJ1dHRvbjtcclxubGV0IGlvc0ltYWdlOiBJbWFnZTtcclxubGV0IGN1cnJlbnRJbWFnZTogaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2U7XHJcblxyXG52YXIgY3VycmVudFNhdmVkUGF0aDogc3RyaW5nO1xyXG5sZXQgcGxheWVyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uU2Nyb2xsU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICBpZiAoYXJncy5kaXJlY3Rpb24gPT09IDEpIHtcclxuICAgICAgICBwcmV2aW91c0RhdGUoKTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5kaXJlY3Rpb24gPT09IDIpIHtcclxuICAgICAgICBuZXh0RGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcblxyXG4gICAgc2hhcmVCdXR0b24gPSA8QnV0dG9uPnBhZ2UuZ2V0Vmlld0J5SWQoXCJidG4tc2hhclwiKTtcclxuICAgIHNhdmVCdXR0b24gPSA8QnV0dG9uPnBhZ2UuZ2V0Vmlld0J5SWQoXCJidG4tc2F2ZVwiKTtcclxuICAgIGRlc2t0b3BCdXR0b24gPSA8QnV0dG9uPnBhZ2UuZ2V0Vmlld0J5SWQoXCJidG4tZGVza1wiKTtcclxuXHJcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgIHBsYXllciA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgc2V0QnV0dG9uc09wYWNpdHkoc2hhcmVCdXR0b24sIHNhdmVCdXR0b24sIGRlc2t0b3BCdXR0b24sIDAuMik7XHJcbiAgICAgICAgc2V0VXNlckludGVyYWN0aW9uKHNoYXJlQnV0dG9uLCBzYXZlQnV0dG9uLCBkZXNrdG9wQnV0dG9uLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xyXG4gICAgICAgIGlvc0ltYWdlID0gPEltYWdlPnBhZ2UuZ2V0Vmlld0J5SWQoXCJpb3MtaW1hZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpKSB7XHJcbiAgICAgICAgYXBvZFZpZXdNb2RlbC5pbml0RGF0YUl0ZW1zKCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpLm1lZGlhX3R5cGUgPT09IFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkICYmIChhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpLm1lZGlhX3R5cGUgPT09IFwidmlkZW9cIikpIHtcclxuICAgICAgICAgICAgICAgIGluaXRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgYXBvZFZpZXdNb2RlbC5zZXQoXCJpc1BsYXllclZpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IGFwb2RWaWV3TW9kZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0RhdGUoKSB7XHJcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgIHNldEJ1dHRvbnNPcGFjaXR5KHNoYXJlQnV0dG9uLCBzYXZlQnV0dG9uLCBkZXNrdG9wQnV0dG9uLCAwLjIpO1xyXG4gICAgICAgIHNldFVzZXJJbnRlcmFjdGlvbihzaGFyZUJ1dHRvbiwgc2F2ZUJ1dHRvbiwgZGVza3RvcEJ1dHRvbiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IGFkZCBjaGVjayBpZiB0aGUgZGF0ZSBpcyBub3QgdG9vIGZhciBpbiB0aGUgcGFzdCAoY2hlY2sgZmlyc3QgQVBPRCBkYXRlKVxyXG4gICAgdmFyIGN1cnJlbnREYXRlID0gYXBvZFZpZXdNb2RlbC5nZXQoXCJzZWxlY3RlZERhdGVcIik7XHJcbiAgICBjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSAtIDEpO1xyXG4gICAgYXBvZFZpZXdNb2RlbC5zZXQoXCJzZWxlY3RlZERhdGVcIiwgY3VycmVudERhdGUpO1xyXG4gICAgYXBvZFZpZXdNb2RlbC5pbml0RGF0YUl0ZW1zKGZvcm1hdHRlcnMuZm9ybWF0RGF0ZShjdXJyZW50RGF0ZSkpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCAmJiAoYXBvZFZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKS5tZWRpYV90eXBlID09PSBcInZpZGVvXCIpKSB7XHJcbiAgICAgICAgICAgIGluaXRQbGF5ZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgYXBvZFZpZXdNb2RlbC5zZXQoXCJpc1BsYXllclZpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV4dERhdGUoKSB7XHJcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgIHNldEJ1dHRvbnNPcGFjaXR5KHNoYXJlQnV0dG9uLCBzYXZlQnV0dG9uLCBkZXNrdG9wQnV0dG9uLCAwLjIpO1xyXG4gICAgICAgIHNldFVzZXJJbnRlcmFjdGlvbihzaGFyZUJ1dHRvbiwgc2F2ZUJ1dHRvbiwgZGVza3RvcEJ1dHRvbiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50RGF0ZSA9IGFwb2RWaWV3TW9kZWwuZ2V0KFwic2VsZWN0ZWREYXRlXCIpO1xyXG4gICAgaWYgKGN1cnJlbnREYXRlID49IG5ldyBEYXRlKCkpIHtcclxuICAgICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0b2FzdC5tYWtlVGV4dChcIkNhbiBub3QgbG9hZCBwaG90b3MgZnJvbSB0aGUgZnV0dXJlIVwiKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xyXG4gICAgICAgIGFwb2RWaWV3TW9kZWwuc2V0KFwic2VsZWN0ZWREYXRlXCIsIGN1cnJlbnREYXRlKTtcclxuICAgICAgICBhcG9kVmlld01vZGVsLmluaXREYXRhSXRlbXMoZm9ybWF0dGVycy5mb3JtYXREYXRlKGN1cnJlbnREYXRlKSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCAmJiAoYXBvZFZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKS5tZWRpYV90eXBlID09PSBcInZpZGVvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIGFwb2RWaWV3TW9kZWwuc2V0KFwiaXNQbGF5ZXJWaXNpYmxlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25GaW5hbEltYWdlU2V0KGFyZ3M6IEZpbmFsRXZlbnREYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uRmluYWxJbWFnZVNldFwiKVxyXG4gICAgdmFyIGRyYXdlZSA9IGFyZ3Mub2JqZWN0IGFzIEZyZXNjb0RyYXdlZTtcclxuXHJcbiAgICBjdXJyZW50SW1hZ2UgPSBzZXRDdXJyZW50SW1hZ2UoZHJhd2VlLmltYWdlVXJpKTtcclxuXHJcbiAgICBzYXZlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjIsIHJvdGF0ZTogMzYwIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2F2ZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC41LCByb3RhdGU6IDE4MCwgZHVyYXRpb246IDE1MCB9KTsgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBzYXZlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAxLjAsIHJvdGF0ZTogMCwgZHVyYXRpb246IDE1MCB9KTsgfSk7XHJcblxyXG4gICAgZGVza3RvcEJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC4yLCByb3RhdGU6IDM2MCB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIGRlc2t0b3BCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDAuNSwgcm90YXRlOiAxODAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gZGVza3RvcEJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMS4wLCByb3RhdGU6IDAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pO1xyXG5cclxuICAgIHNoYXJlQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjIsIHJvdGF0ZTogMzYwIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2hhcmVCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDAuNSwgcm90YXRlOiAxODAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2hhcmVCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDEuMCwgcm90YXRlOiAwLCBkdXJhdGlvbjogMTUwIH0pOyB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHsgc2V0VXNlckludGVyYWN0aW9uKHNoYXJlQnV0dG9uLCBzYXZlQnV0dG9uLCBkZXNrdG9wQnV0dG9uLCB0cnVlKSB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uU2F2ZUltYWdlKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG5cclxuICAgIGZpcmViYXNlUHVzaChhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpLCBcInNhdmVcIik7XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xyXG4gICAgICAgIGltYWdlU291cmNlLmZyb21VcmwoaW9zSW1hZ2Uuc3JjKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUZpbGUocmVzLCBhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpLnVybCwgY3VycmVudFNhdmVkUGF0aCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgIHNhdmVGaWxlKGN1cnJlbnRJbWFnZSwgYXBvZFZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKS51cmwsIGN1cnJlbnRTYXZlZFBhdGgpO1xyXG4gICAgICAgIHRvYXN0Lm1ha2VUZXh0KFwiUGhvdG8gc2F2ZWQgaW4gL0Rvd25sb2Fkcy9Db3Ntb3NEYXRhQmFuay9cIikuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TZXRXYWxscGFwZXIoYXJnczogRXZlbnREYXRhKSB7XHJcblxyXG4gICAgZmlyZWJhc2VQdXNoKGFwb2RWaWV3TW9kZWwuZ2V0KFwiZGF0YUl0ZW1cIiksIFwid2FsbHBhcGVyXCIpO1xyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcclxuICAgICAgICBpbWFnZVNvdXJjZS5mcm9tVXJsKGlvc0ltYWdlLnNyYylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZSA9IHJlczsgLy8gVE9ETyA6IHNldCB3YWxscGFwZXIgZm9yIGlPU1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSk7O1xyXG4gICAgfSBlbHNlIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgICAgc2F2ZUZpbGUoY3VycmVudEltYWdlLCBhcG9kVmlld01vZGVsLmdldChcImRhdGFJdGVtXCIpLnVybCwgY3VycmVudFNhdmVkUGF0aCk7XHJcblxyXG4gICAgICAgIHZhciB3YWxscGFwZXJNYW5hZ2VyID0gYW5kcm9pZC5hcHAuV2FsbHBhcGVyTWFuYWdlci5nZXRJbnN0YW5jZSh1dGlscy5hZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2FsbHBhcGVyTWFuYWdlci5zZXRCaXRtYXAoY3VycmVudEltYWdlLmFuZHJvaWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvYXN0Lm1ha2VUZXh0KFwiV2FsbHBhcGVyIFNldCFcIikuc2hvdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TaGFyZShhcmdzOiBFdmVudERhdGEpIHtcclxuXHJcbiAgICBmaXJlYmFzZVB1c2goYXBvZFZpZXdNb2RlbC5nZXQoXCJkYXRhSXRlbVwiKSwgXCJzaGFyZVwiKTtcclxuXHJcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xyXG4gICAgICAgIFNvY2lhbFNoYXJlLnNoYXJlSW1hZ2UoY3VycmVudEltYWdlLCBcIk5BU0EgQVBPRFwiKTtcclxuICAgIH0gZWxzZSBpZiAoYXBwbGljYXRpb24uaW9zKSB7XHJcbiAgICAgICAgaW1hZ2VTb3VyY2UuZnJvbVVybChpb3NJbWFnZS5zcmMpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZUltYWdlKHJlcyk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBsYXllcigpIHtcclxuICAgIHZhciBtZWRpYVVybCA9IGFwb2RWaWV3TW9kZWwuZ2V0KFwiZGF0YUl0ZW1cIikudXJsO1xyXG5cclxuICAgIGlmIChtZWRpYVVybC5pbmRleE9mKFwieW91dHViZVwiKSA+PSAwKSB7XHJcbiAgICAgICAgYXBvZFZpZXdNb2RlbC5zZXQoXCJpc1BsYXllclZpc2libGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIHlvdXR1YmVJRCA9IHlvdXR1YmVIZWxwZXJzLmdldFlvdVR1YmVJRChtZWRpYVVybCk7XHJcbiAgICAgICAgcGxheWVyLmxvYWRWaWRlbyh5b3V0dWJlSUQsIDEwKTsgLy8gcGFzcyB0aGUgYWN0dWFsIHZpZGVvIGhlcmUgb3IgbG9hZCB3ZWItdmlld1xyXG4gICAgICAgIHBsYXllci5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYXllci5wYXVzZSgpO1xyXG4gICAgICAgIGFwb2RWaWV3TW9kZWwuc2V0KFwiaXNQbGF5ZXJWaXNpYmxlXCIsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=