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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8tZGV0YWlscy1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGhvdG8tZGV0YWlscy1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBd0Q7QUFHeEQsa0NBQW1DO0FBR25DLHlDQUEyQztBQUMzQywwQ0FBNEM7QUFDNUMsbUNBQXFDO0FBR3JDLHVEQUF5RDtBQUV6RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsOERBQWlIO0FBRWpILElBQUksU0FBcUIsQ0FBQztBQUMxQixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksV0FBbUIsQ0FBQztBQUN4QixJQUFJLFVBQWtCLENBQUM7QUFDdkIsSUFBSSxhQUFxQixDQUFDO0FBQzFCLElBQUksUUFBZSxDQUFDO0FBRXBCLElBQUksWUFBcUMsQ0FBQztBQUMxQyxJQUFJLGdCQUF3QixDQUFDO0FBRTdCLDJCQUFrQyxJQUFlO0lBQzdDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRXpCLFdBQVcsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELFVBQVUsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELGFBQWEsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXJELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLGdDQUFpQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixRQUFRLEdBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ3hDLFNBQVMsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztJQUM3QixTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUV2RCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUNwQyxDQUFDO0FBcEJELDhDQW9CQztBQUVELGdCQUF1QixJQUFlO0lBQ2xDLGVBQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFGRCx3QkFFQztBQUVELHlCQUFnQyxJQUFvQjtJQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBc0IsQ0FBQztJQUV6QyxZQUFZLEdBQUcsOEJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQzVDLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hGLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQy9DLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNGLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0YsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQzdDLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pGLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGLElBQUksQ0FBQyxjQUFRLGlDQUFrQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUYsQ0FBQztBQWpCRCwwQ0FpQkM7QUFFRCxxQkFBNEIsSUFBZTtJQUV2QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLHVCQUFRLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdCLHVCQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEYsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZFLENBQUM7QUFDTCxDQUFDO0FBYkQsa0NBYUM7QUFFRCx3QkFBK0IsSUFBZTtJQUUxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQywrQkFBK0I7UUFDdkQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO0lBQ1osQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU3Qix1QkFBUSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWhGLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDO1lBQ0QsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0FBQ0wsQ0FBQztBQXRCRCx3Q0FzQkM7QUFFRCxpQkFBd0IsSUFBZTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QixXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUM1QixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ0wsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDTCxDQUFDO0FBWEQsMEJBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuXG5pbXBvcnQgeyBGcmVzY29EcmF3ZWUsIEZpbmFsRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mcmVzY29cIjtcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XG5cbmlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgdmFyIHRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcbn1cblxuaW1wb3J0IHsgc2F2ZUZpbGUsIHNldEJ1dHRvbnNPcGFjaXR5LCBzZXRVc2VySW50ZXJhY3Rpb24sIHNldEN1cnJlbnRJbWFnZSB9IGZyb20gXCIuLi9oZWxwZXJzL2ZpbGVzL2ZpbGUtaGVscGVyc1wiO1xuXG5sZXQgdmlld01vZGVsOiBPYnNlcnZhYmxlO1xubGV0IHBhZ2U6IFBhZ2U7XG5sZXQgc2hhcmVCdXR0b246IEJ1dHRvbjtcbmxldCBzYXZlQnV0dG9uOiBCdXR0b247XG5sZXQgZGVza3RvcEJ1dHRvbjogQnV0dG9uO1xubGV0IGlvc0ltYWdlOiBJbWFnZTtcblxubGV0IGN1cnJlbnRJbWFnZTogaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2U7XG52YXIgY3VycmVudFNhdmVkUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgc2hhcmVCdXR0b24gPSA8QnV0dG9uPnBhZ2UuZ2V0Vmlld0J5SWQoXCJidG4tc2hhclwiKTtcbiAgICBzYXZlQnV0dG9uID0gPEJ1dHRvbj5wYWdlLmdldFZpZXdCeUlkKFwiYnRuLXNhdmVcIik7XG4gICAgZGVza3RvcEJ1dHRvbiA9IDxCdXR0b24+cGFnZS5nZXRWaWV3QnlJZChcImJ0bi1kZXNrXCIpO1xuXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbiAgICAgICAgc2V0QnV0dG9uc09wYWNpdHkoc2hhcmVCdXR0b24sIHNhdmVCdXR0b24sIGRlc2t0b3BCdXR0b24sIDAuMik7XG4gICAgfVxuXG4gICAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xuICAgICAgICBpb3NJbWFnZSA9IDxJbWFnZT5wYWdlLmdldFZpZXdCeUlkKFwiaW9zLWltYWdlXCIpO1xuICAgIH1cblxuICAgIGxldCBuYXZDb250ZXh0ID0gcGFnZS5uYXZpZ2F0aW9uQ29udGV4dDtcbiAgICB2aWV3TW9kZWwgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIHZpZXdNb2RlbC5zZXQoXCJjb250ZXh0SXRlbVwiLCBuYXZDb250ZXh0W1widGFwcGVkSXRlbVwiXSk7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld01vZGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29CYWNrKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIHRvcG1vc3QoKS5nb0JhY2soKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRmluYWxJbWFnZVNldChhcmdzOiBGaW5hbEV2ZW50RGF0YSkge1xuICAgIHZhciBkcmF3ZWUgPSBhcmdzLm9iamVjdCBhcyBGcmVzY29EcmF3ZWU7XG5cbiAgICBjdXJyZW50SW1hZ2UgPSBzZXRDdXJyZW50SW1hZ2UoZHJhd2VlLmltYWdlVXJpKTtcblxuICAgIHNhdmVCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDAuMiwgcm90YXRlOiAzNjAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2F2ZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC41LCByb3RhdGU6IDE4MCwgZHVyYXRpb246IDE1MCB9KTsgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2F2ZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMS4wLCByb3RhdGU6IDAsIGR1cmF0aW9uOiAxNTAgfSk7IH0pO1xuXG4gICAgZGVza3RvcEJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC4yLCByb3RhdGU6IDM2MCB9KVxuICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBkZXNrdG9wQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjUsIHJvdGF0ZTogMTgwLCBkdXJhdGlvbjogMTUwIH0pOyB9KVxuICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBkZXNrdG9wQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAxLjAsIHJvdGF0ZTogMCwgZHVyYXRpb246IDE1MCB9KTsgfSk7XG5cbiAgICBzaGFyZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC4yLCByb3RhdGU6IDM2MCB9KVxuICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBzaGFyZUJ1dHRvbi5hbmltYXRlKHsgb3BhY2l0eTogMC41LCByb3RhdGU6IDE4MCwgZHVyYXRpb246IDE1MCB9KTsgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gc2hhcmVCdXR0b24uYW5pbWF0ZSh7IG9wYWNpdHk6IDEuMCwgcm90YXRlOiAwLCBkdXJhdGlvbjogMTUwIH0pOyB9KVxuICAgICAgICAudGhlbigoKSA9PiB7IHNldFVzZXJJbnRlcmFjdGlvbihzaGFyZUJ1dHRvbiwgc2F2ZUJ1dHRvbiwgZGVza3RvcEJ1dHRvbiwgdHJ1ZSkgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblNhdmVJbWFnZShhcmdzOiBFdmVudERhdGEpIHtcblxuICAgIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAgICAgaW1hZ2VTb3VyY2UuZnJvbVVybChpb3NJbWFnZS5zcmMpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHNhdmVGaWxlKHJlcywgdmlld01vZGVsLmdldChcImNvbnRleHRJdGVtXCIpLmltYWdlVXJpLCBjdXJyZW50U2F2ZWRQYXRoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgICBzYXZlRmlsZShjdXJyZW50SW1hZ2UsIHZpZXdNb2RlbC5nZXQoXCJjb250ZXh0SXRlbVwiKS5pbWFnZVVyaSwgY3VycmVudFNhdmVkUGF0aCk7XG4gICAgICAgIHRvYXN0Lm1ha2VUZXh0KFwiUGhvdG8gc2F2ZWQgaW4gL0Rvd25sb2Fkcy9Db3Ntb3NEYXRhQmFuay9cIikuc2hvdygpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uU2V0V2FsbHBhcGVyKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xuICAgICAgICBpbWFnZVNvdXJjZS5mcm9tVXJsKGlvc0ltYWdlLnNyYylcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY3VycmVudEltYWdlID0gcmVzOyAvLyBUT0RPIDogc2V0IHdhbGxwYXBlciBmb3IgaU9TXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTs7XG4gICAgfSBlbHNlIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG5cbiAgICAgICAgc2F2ZUZpbGUoY3VycmVudEltYWdlLCB2aWV3TW9kZWwuZ2V0KFwiY29udGV4dEl0ZW1cIikuaW1hZ2VVcmksIGN1cnJlbnRTYXZlZFBhdGgpO1xuXG4gICAgICAgIHZhciB3YWxscGFwZXJNYW5hZ2VyID0gYW5kcm9pZC5hcHAuV2FsbHBhcGVyTWFuYWdlci5nZXRJbnN0YW5jZSh1dGlscy5hZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3YWxscGFwZXJNYW5hZ2VyLnNldEJpdG1hcChjdXJyZW50SW1hZ2UuYW5kcm9pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0b2FzdC5tYWtlVGV4dChcIldhbGxwYXBlciBTZXQhXCIpLnNob3coKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblNoYXJlKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgICAgIFNvY2lhbFNoYXJlLnNoYXJlSW1hZ2UoY3VycmVudEltYWdlLCBcIk1hcnMgUm92ZXJzXCIpO1xuICAgIH0gZWxzZSBpZiAoYXBwbGljYXRpb24uaW9zKSB7XG4gICAgICAgIGltYWdlU291cmNlLmZyb21VcmwoaW9zSW1hZ2Uuc3JjKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZUltYWdlKHJlcyk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=